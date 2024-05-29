const { expect } = require("chai");
const { ethers } = require("hardhat");
const { keccak256, toUtf8Bytes, AbiCoder } = require("ethers");

describe("CertificateManagement", function () {
  let certManagement;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async function () {
    const CertificateManagement = await ethers.getContractFactory("CertificateManagement");
    [owner, addr1, addr2] = await ethers.getSigners();
    certManagement = await CertificateManagement.deploy();
    await certManagement.waitForDeployment();
  });

  it("Should add and verify a new issuer", async function () {
    await certManagement.addIssuer(addr1.address);
    expect(await certManagement.authorizedIssuers(addr1.address)).to.equal(true);
  });

  it("Should remove and verify an issuer", async function () {
    await certManagement.addIssuer(addr1.address);
    await certManagement.removeIssuer(addr1.address);
    expect(await certManagement.authorizedIssuers(addr1.address)).to.equal(false);
  });

  it("Should issue a certificate", async function () {
    await certManagement.addIssuer(addr1.address);
    const tx = await certManagement.connect(addr1).issueCertificate("John Doe", "Blockchain 101", "University");
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

      const certificate = await certManagement.certificates(certificateID);
      expect(certificate.studentName).to.equal(studentName);
      expect(certificate.course).to.equal("Blockchain 101");
      expect(certificate.issuer).to.equal(issuer);
      expect(certificate.isValid).to.equal(true);
    } else {
      throw new Error("CertificateIssued event not found in the transaction receipt.");
    }
  });

  it("Should revoke a certificate", async function () {
    await certManagement.addIssuer(addr1.address);
    const tx = await certManagement.connect(addr1).issueCertificate("John Doe", "Blockchain 101", "University");
    const receipt = await tx.wait();

    const logs = receipt.logs;
    const eventSignature = keccak256(toUtf8Bytes("CertificateIssued(uint256,string,string)"));
    const event = logs.find(log => log.topics[0] === eventSignature);

    if (event) {
      const certificateID = event.topics[1];

      await certManagement.connect(addr1).revokeCertificate(certificateID);
      const certificate = await certManagement.certificates(certificateID);
      expect(certificate.isValid).to.equal(false);
    } else {
      throw new Error("CertificateIssued event not found in the transaction receipt.");
    }
  });

  it("Should verify certificate validity", async function () {
    await certManagement.addIssuer(addr1.address);
    const tx = await certManagement.connect(addr1).issueCertificate("John Doe", "Blockchain 101", "University");
    const receipt = await tx.wait();

    const logs = receipt.logs;
    const eventSignature = keccak256(toUtf8Bytes("CertificateIssued(uint256,string,string)"));
    const event = logs.find(log => log.topics[0] === eventSignature);

    if (event) {
      const certificateID = event.topics[1];

      let isValid = await certManagement.verifyCertificate(certificateID);
      expect(isValid).to.equal(true);

      await certManagement.connect(addr1).revokeCertificate(certificateID);
      isValid = await certManagement.verifyCertificate(certificateID);
      expect(isValid).to.equal(false);
    } else {
      throw new Error("CertificateIssued event not found in the transaction receipt.");
    }
  });
});
