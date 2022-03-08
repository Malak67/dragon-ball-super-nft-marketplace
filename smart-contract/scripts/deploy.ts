// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers, upgrades } from "hardhat";

async function main() {
  let totalSupply = "10000000000000000000000"; // 10000 * 1e18
  let initialMintPrice = "10000000000000000000"; // 1e18
  const DragonBallSuperTokenContract = await ethers.getContractFactory(
    "DragonBallSuperToken"
  );
  const DragonBallSuperTokenProxy = await upgrades.deployProxy(
    DragonBallSuperTokenContract,
    [totalSupply],
    {
      initializer: "initialize",
    }
  );
  console.log(
    `[DragonBallSuperTokenContract]: Deployed; Proxy address:`,
    DragonBallSuperTokenProxy.address
  );
  await DragonBallSuperTokenProxy.deployed();

  const DragonBallSuperLedgerContract = await ethers.getContractFactory(
    "DragonBallSuperLedger"
  );
  const DragonBallSuperLedgerProxy = await upgrades.deployProxy(
    DragonBallSuperLedgerContract,
    [DragonBallSuperTokenProxy.address, initialMintPrice],
    {
      initializer: "initialize",
    }
  );
  await DragonBallSuperLedgerProxy.deployed();
  console.log(
    `[DragonBallSuperLedgerProxy]: Deployed; Proxy address:`,
    DragonBallSuperLedgerProxy.address
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
