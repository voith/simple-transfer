require("dotenv").config();
import { HardhatUserConfig } from "hardhat/config";
import "hardhat-dependency-compiler";
import "@nomicfoundation/hardhat-chai-matchers";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-ethers";
import "@nomicfoundation/hardhat-verify";
import "hardhat-deploy";
import "solidity-coverage";
import "hardhat-gas-reporter";
import "hardhat-tracer";

const TEST_PRIVATE_KEY = process.env.TEST_PRIVATE_KEY as string;

const config: HardhatUserConfig = {
  namedAccounts: {
    deployer: {
      default: 0, // here this will by default take the first account as deployer
    },
  },
  solidity: {
    version: "0.8.18",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  paths: {
    sources: "./contracts",
    cache: "./cache_hardhat",
  },
  networks: {
    lineaGoerli: {
      chainId: 59140,
      url: process.env.LINEA_GOERLI_URL,
      accounts: [TEST_PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: {
      lineaGoerli: process.env.ETHERSCAN_API_KEY as string,
    },
    customChains: [
      {
        network: "lineaGoerli",
        chainId: 59140,
        urls: {
          apiURL: process.env.LINEA_GOERLI_URL,
          browserURL: "https://explorer.goerli.linea.build",
        },
      },
    ],
  },
};

export default config;
