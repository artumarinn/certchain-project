import { ethers } from "hardhat";

async function main() {
  console.log("------------------------------------------");
  console.log("Desplegando Certification en Sepolia...");
  const Certification = await ethers.getContractFactory("Certification");
  const certification = await Certification.deploy();
  await certification.waitForDeployment();
  const certificationAddress = await certification.getAddress();
  console.log("Certification desplegado en Sepolia:", certificationAddress);
  console.log("------------------------------------------");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});