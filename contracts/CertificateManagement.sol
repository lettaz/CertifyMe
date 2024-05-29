// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CertificateManagement {
    // Struct to store certificate information
    struct Certificate {
        uint256 id;
        string studentName;
        string course;
        uint256 issueDate;
        bool isValid;
        string issuer;
    }

    // Mapping from certificate ID to certificate details
    mapping(uint256 => Certificate) public certificates;
    // Mapping from an address to a boolean indicating if it is authorized to issue and revoke certificates
    mapping(address => bool) public authorizedIssuers;
    // Event emitted when a certificate is issued
    event CertificateIssued(uint256 indexed certificateID, string studentName, string issuer);
    // Event emitted when a certificate is revoked
    event CertificateRevoked(uint256 indexed certificateID);

    // Modifier to check if the caller is an authorized issuer
    modifier onlyAuthorized() {
        require(authorizedIssuers[msg.sender], "Caller is not authorized");
        _;
    }

    constructor() {
        // The deployer of the contract is the initial authorized issuer
        authorizedIssuers[msg.sender] = true;
    }

    // Function to authorize a new issuer
    function addIssuer(address issuer) external onlyAuthorized {
        authorizedIssuers[issuer] = true;
    }

    // Function to revoke issuer rights
    function removeIssuer(address issuer) external onlyAuthorized {
        authorizedIssuers[issuer] = false;
    }

    // Function to issue a new certificate
    function issueCertificate(string memory studentName, string memory course, string memory issuer) public onlyAuthorized returns (uint256) {
        uint256 newCertificateID = uint256(keccak256(abi.encodePacked(block.timestamp, msg.sender, studentName, course)));
        certificates[newCertificateID] = Certificate(newCertificateID, studentName, course, block.timestamp, true, issuer);
        emit CertificateIssued(newCertificateID, studentName, issuer); // Ensure this line is correct
        return newCertificateID;
    }

    // Function to revoke a certificate
    function revokeCertificate(uint256 certificateID) public onlyAuthorized {
        require(certificates[certificateID].isValid, "Certificate already revoked");
        certificates[certificateID].isValid = false;
        emit CertificateRevoked(certificateID);
    }

    // Function to verify the validity of a certificate
    function verifyCertificate(uint256 certificateID) public view returns (bool) {
        return certificates[certificateID].isValid;
    }
}
