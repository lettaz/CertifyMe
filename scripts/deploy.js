const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const CertificateManagement = await ethers.getContractFactory("CertificateManagement");
  const certManagement = await CertificateManagement.deploy();
  await certManagement.waitForDeployment();
  
  console.log("CertificateManagement deployed to:", await certManagement.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error("Deployment failed:", error);
    process.exit(1);
  });
