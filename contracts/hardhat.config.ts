import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";

dotenv.config();

console.log("DEBUG: SEPOLIA_URL from .env:", process.env.SEPOLIA_URL);

const SEPOLIA_URL: string = process.env.SEPOLIA_URL || "";
const SEPOLIA_PRIVATE_KEY: string = process.env.SEPOLIA_PRIVATE_KEY || "";
const ETHERSCAN_API_KEY: string = process.env.ETHERSCAN_API_KEY || "";

const MOONBASE_ALPHA_URL: string = process.env.MOONBASE_ALPHA_URL || "";
const MOONBASE_ALPHA_PRIVATE_KEY: string = process.env.MOONBASE_ALPHA_PRIVATE_KEY || "";
const MOONSCAN_API_KEY: string = process.env.MOONSCAN_API_KEY || "";

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
      viaIR: true,
    },
  },

  networks: {
    hardhat: {},
    sepolia: {
      url: SEPOLIA_URL,
      accounts: SEPOLIA_PRIVATE_KEY ? [SEPOLIA_PRIVATE_KEY] : [],
      chainId: 11155111,
      // gasPrice: 2000000000,
      // gas: 6000000,
    },
    moonbase: {
      url: MOONBASE_ALPHA_URL,
      accounts: MOONBASE_ALPHA_PRIVATE_KEY ? [MOONBASE_ALPHA_PRIVATE_KEY] : [],
      chainId: 1287,
      // gasPrice: 20000000000,
      // gas: 6000000,
    }
  },

  etherscan: {
    apiKey: {
      sepolia: ETHERSCAN_API_KEY,
      moonbaseAlpha: MOONSCAN_API_KEY,
    },
    customChains: [
      {
        network: "moonbase",
        chainId: 1287,
        urls: {
          apiURL: "https://api-moonbase.moonscan.io/api",
          browserURL: "https://moonbase.moonscan.io"
        }
      }
    ]
  },
};

export default config;