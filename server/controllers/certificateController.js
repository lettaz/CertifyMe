const { ethers } = require('ethers');
const { keccak256, toUtf8Bytes, AbiCoder } = require("ethers");
const { Student } = require('../models');
const fs = require('fs');

const provider = new ethers.JsonRpcProvider(`https://sepolia.infura.io/v3/${process.env.INFURA_PROJECT_ID}`);
const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contractAddress = process.env.CONTRACT_ADDRESS;
const artifactPath = '../artifacts/contracts/CertificateManagement.sol/CertificateManagement.json';
const artifact = JSON.parse(fs.readFileSync(artifactPath, 'utf8'));
const contractABI = artifact.abi;
const contract = new ethers.Contract(contractAddress, contractABI, signer);

const issueCertificate = async (req, res) => {
    console.log('User object:', req.user);
    const { studentID, course } = req.body;
    try {
        const student = await Student.findOne({ where: { studentID } });
        if (!student) return res.status(404).send({ error: 'Student not found' });

        console.log(student.name, course, req.user.name);

        // Authorize the issuer if not already authorized
        const isAuthorized = await contract.authorizedIssuers(signer.address);
        if (!isAuthorized) {
            const authorizeTx = await contract.addIssuer(signer.address);
            await authorizeTx.wait();
        }

        const tx = await contract.issueCertificate(student.name, course, req.user.name);
        const receipt = await tx.wait();

        const logs = receipt.logs;
        const eventSignature = keccak256(toUtf8Bytes("CertificateIssued(uint256,string,string)"));
        const event = logs.find(log => log.topics[0] === eventSignature);

        if (event) {
            const abiCoder = AbiCoder.defaultAbiCoder();
            const certificateID = event.topics[1];
            const decodedData = abiCoder.decode(["string", "string"], event.data);
            const studentName = decodedData[0];
            const issuer = decodedData[1];

            student.certID = certificateID;
            await student.save();

            res.send({ certificateID: certificateID.toString(), studentName, issuer });
        } else {
            throw new Error("CertificateIssued event not found in the transaction receipt.");
        }
    } catch (error) {
        console.error('Error issuing certificate:', error);
        res.status(400).send({ error: error.message });
    }
};

const revokeCertificate = async (req, res) => {
    const { certID } = req.body;
    console.log('Attempting to revoke certificate with ID:', certID);

    try {
        // Authorize the issuer if not already authorized
        const isAuthorized = await contract.authorizedIssuers(signer.address);
        if (!isAuthorized) {
            const authorizeTx = await contract.addIssuer(signer.address);
            await authorizeTx.wait();
            console.log('Issuer authorized:', signer.address);
        }

        // Execute revocation
        const tx = await contract.revokeCertificate(certID);
        await tx.wait();

        // Update the student record in the database
        const student = await Student.findOne({ where: { certID } });
        if (student) {
            student.certID = null;
            await student.save();
            console.log('Certificate revoked and student record updated for studentID:', student.studentID);
        } else {
            console.log('No student found with certID:', certID);
        }

        res.send({ success: true, message: 'Certificate successfully revoked.' });
    } catch (error) {
        console.error('Error revoking certificate:', error);
        res.status(400).send({ error: error.message });
    }
};

const verifyCertificate = async (req, res) => {
    const { university_id, student_id } = req.params;
    try {

      // Find the student associated with the university and student ID
      const student = await Student.findOne({
        where: { studentID: student_id, institutionID: university_id }
      });
  
      if (!student || !student.certID) {
        return res.status(404).send({ error: 'No certificate found for this student.' });
      }

      // Authorize the issuer if not already authorized
     const isAuthorized = await contract.authorizedIssuers(signer.address);
     if (!isAuthorized) {
         const authorizeTx = await contract.addIssuer(signer.address);
         await authorizeTx.wait();
         console.log('Issuer authorized:', signer.address);
     }
  
      // Verify the certificate on the blockchain using the certID
      const isValid = await contract.verifyCertificate(student.certID);
      res.send({ isValid });
    } catch (error) {
      res.status(400).send(error);
    }
};
  

module.exports = { issueCertificate, revokeCertificate, verifyCertificate };
