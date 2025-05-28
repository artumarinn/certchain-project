import { ethers } from "hardhat";

async function main() {
  console.log("------------------------------------------");
  console.log("Desplegando CertificateAnchor en Moonbase Alpha...");
  const CertificateAnchor = await ethers.getContractFactory("CertificateAnchor");
  const certificateAnchor = await CertificateAnchor.deploy();
  await certificateAnchor.waitForDeployment();
  const certificateAnchorAddress = await certificateAnchor.getAddress();
  console.log("CertificateAnchor desplegado en Moonbase Alpha:", certificateAnchorAddress);
  console.log("------------------------------------------");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});