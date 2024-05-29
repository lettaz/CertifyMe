const { ethers } = require("hardhat");
const { keccak256, toUtf8Bytes, AbiCoder } = require("ethers");

async function main() {
    const [deployer] = await ethers.getSigners();
    const CertificateManagement = await ethers.getContractFactory("CertificateManagement");
    const certManagement = await CertificateManagement.deploy();
    await certManagement.waitForDeployment();
    console.log("CertificateManagement deployed to:", await certManagement.getAddress());

    await certManagement.addIssuer(deployer.address);

    const tx = await certManagement.issueCertificate("John Doe", "Blockchain 101", "University");
    const receipt = await tx.wait();
    console.log("Transaction Receipt:", receipt);

    const logs = receipt.logs;
    console.log("Transaction Logs:", logs);

    if (logs.length > 0) {
        // Calculate the event signature
        const eventSignature = keccak256(toUtf8Bytes("CertificateIssued(uint256,string,string)"));
        console.log("Event Signature:", eventSignature);
        
        // Log each topic and data for inspection
        logs.forEach((log, index) => {
            console.log(`Log ${index} Address:`, log.address);
            console.log(`Log ${index} Topics:`, log.topics);
            console.log(`Log ${index} Data:`, log.data);
        });

        // Find the log corresponding to the event
        const event = logs.find(log => log.topics[0] === eventSignature);
        if (event) {
            console.log("Event found:", event);
            // The first topic is the event signature, and the second topic is the indexed parameter (certificateID)
            const certificateID = event.topics[1];
            
            // Create an instance of AbiCoder
            const abiCoder = AbiCoder.defaultAbiCoder();
            
            // Decode the data part (non-indexed parameters: studentName and issuer)
            const decodedData = abiCoder.decode(
                ["string", "string"],
                event.data
            );
            const studentName = decodedData[0];
            const issuer = decodedData[1];
            
            console.log("Issued Certificate ID:", certificateID);
            console.log("Student Name:", studentName);
            console.log("Issuer:", issuer);
        } else {
            console.log("CertificateIssued event not found in the transaction receipt.");
        }
    } else {
        console.log("No logs found in the transaction receipt.");
    }
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
