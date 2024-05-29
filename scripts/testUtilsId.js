const { keccak256, toUtf8Bytes} = require("ethers");

async function testUtilsKeccak256() {
    // Random string
    const randomString = "Hello World";
    const randomStringHash = keccak256(toUtf8Bytes(randomString));
    console.log(`Hash of "${randomString}": ${randomStringHash}`);

    // Event signature
    const eventSignatureString = "CertificateIssued(uint256,string,string)";
    const eventSignatureHash = keccak256(toUtf8Bytes(eventSignatureString));
    console.log(`Hash of "${eventSignatureString}": ${eventSignatureHash}`);
}

testUtilsKeccak256().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
