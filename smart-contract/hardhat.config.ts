import * as dotenv from "dotenv";

import { HardhatUserConfig, task } from "hardhat/config";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "@openzeppelin/hardhat-upgrades";
import "hardhat-gas-reporter";
import "solidity-coverage";

dotenv.config();

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const DEPLOYER_PRIVATE_KEY =
  process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [];

const config: HardhatUserConfig = {
  solidity: "0.8.2",
  networks: {
    hardhat: {
      blockGasLimit: 10000000,
    },
    ropsten: {
      url: process.env.ROPSTEN_URL || "",
      accounts: DEPLOYER_PRIVATE_KEY,
    },
    kovan: {
      url: process.env.KOVAN_RPC_URL || "",
      accounts: DEPLOYER_PRIVATE_KEY,
    },
    rinkeby: {
      url: process.env.RINKEBY_RPC_URL || "",
      accounts: DEPLOYER_PRIVATE_KEY,
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
};

export default config;
