// scripts/issue_certificate.ts
import { ethers } from "hardhat";
import type { Certification } from "../typechain-types"; // Typechain types for contract interface


async function main() {
  // Contract address on Sepolia
  const CERTIFICATION_CONTRACT_ADDRESS = "0x0CFe09FC0C4D41F063748291708e049657E47616";

  // Recipient wallet address
  const RECIPIENT_ADDRESS = "0x3afAEEe3eac9C2f0d9db72CaeecDd5E48483d4Cc";

  // IPFS CID of the metadata JSON file
  const IPFS_METADATA_HASH = "bafkreiddg7hx3tancaxuqlysyzlad6tcy6k6q52q3tvclfo2au4sfmys34";

  const CertificationFactory = await ethers.getContractFactory("Certification");
  const certification = CertificationFactory.attach(CERTIFICATION_CONTRACT_ADDRESS) as Certification;

  console.log(`\n--- INITIATING CERTIFICATE ISSUANCE ---`);
  console.log(`Contract: ${CERTIFICATION_CONTRACT_ADDRESS}`);
  console.log(`Recipient: ${RECIPIENT_ADDRESS}`);
  console.log(`IPFS Metadata Hash: ${IPFS_METADATA_HASH}`);

  try {
    const tx = await certification.issueCertificate(RECIPIENT_ADDRESS, IPFS_METADATA_HASH);

    console.log(`\nTransaction sent. Transaction Hash: ${tx.hash}`);
    console.log("Waiting for transaction to be mined and confirmed...");

    const receipt = await tx.wait();

    console.log("\nCertificate issued successfully!");
    if (receipt) {
      console.log(`Transaction confirmed in block: ${receipt.blockNumber}`);
      console.log(`Transaction gas cost: ${receipt.gasUsed.toString()} units`);
    } else {
      console.log("Warning: Transaction receipt could not be obtained.");
    }

    // Get the Token ID from the emitted event
    let emittedTokenId: string | undefined = undefined;
    if (receipt && receipt.logs) {
      for (const log of receipt.logs) {
        try {
          const parsedLog = CertificationFactory.interface.parseLog(log);
          if (parsedLog && parsedLog.name === 'CertificateIssued') {
            emittedTokenId = parsedLog.args.tokenId.toString();
            break;
          }
        } catch (err) {
          // Log does not correspond to the event, continue
        }
      }
    }

    if (emittedTokenId) {
      console.log(`\nIssued Certificate Token ID: ${emittedTokenId}`);
      console.log(`You can view the NFT on Sepolia Etherscan here:`);
      console.log(`https://sepolia.etherscan.io/nft/${CERTIFICATION_CONTRACT_ADDRESS}/${emittedTokenId}`);
    } else {
      console.log("\nWarning: 'CertificateIssued' event or Token ID not found in the transaction.");
      console.log("Please ensure your 'Certification.sol' contract emits this event with the correct 'tokenId'.");
    }

    console.log("\nCertificate's JSON metadata is publicly accessible via an IPFS gateway:");
    console.log(`https://ipfs.io/ipfs/${IPFS_METADATA_HASH}`);

  } catch (error) {
    console.error("\n--- ERROR ISSUING CERTIFICATE ---");
    console.error(error);
    process.exitCode = 1;
  }
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});