import * as dotenv from "dotenv";
import { ethers, upgrades } from "hardhat";

dotenv.config();

const TokenProxyContract = process.env.TOKEN_KOVAN_ADDRESS || "";

async function main() {
  const DragonBallSuperTokenContract = await ethers.getContractFactory(
    "DragonBallSuperToken"
  );
  const DragonBallSuperTokenProxy = await upgrades.upgradeProxy(
    TokenProxyContract,
    DragonBallSuperTokenContract
  );
  console.log(
    `[DragonBallSuperTokenContract]: Deployed; Proxy address:`,
    DragonBallSuperTokenProxy.address
  );
  await DragonBallSuperTokenProxy.deployed();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
