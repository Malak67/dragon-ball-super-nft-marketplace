import { expect } from "chai";
import { ethers, upgrades } from "hardhat";
import { ContractTransaction, Contract, BigNumber } from "ethers";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

const TOKEN_URI = "testUri";

describe("DragonBallSuper contracts", function () {
  let totalSupply = "10000000000000000000000"; // 10000 * 1e18
  let initialMintPrice = "10000000000000000000"; // 1e18
  let mintPrice: BigNumber;
  let Ledger: Contract;
  let DBSToken: Contract;
  let owner: SignerWithAddress;
  let addr1: SignerWithAddress;
  let addr2: SignerWithAddress;
  let addrs: SignerWithAddress[];
  let tx: ContractTransaction;

  before(async function () {
    // Get the ContractFactory and Signers here.
    const DBSTokenContract = await ethers.getContractFactory(
      "DragonBallSuperToken"
    );
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

    DBSToken = await upgrades.deployProxy(DBSTokenContract, [totalSupply], {
      initializer: "initialize",
    });

    const DBSLedgerContract = await ethers.getContractFactory(
      "DragonBallSuperLedger"
    );
    Ledger = await upgrades.deployProxy(
      DBSLedgerContract,
      [DBSToken.address, initialMintPrice],
      {
        initializer: "initialize",
      }
    );
    mintPrice = await Ledger.mintPrice();
  });

  // You can nest describe calls to create subsections.
  describe("Dragon Ball Super Deployment", () => {
    it("[Token]: Should have the correct name & symbol", async () => {
      expect(await DBSToken.name()).to.equal("Dragon Ball Super Token");
      expect(await DBSToken.symbol()).to.equal("DBS");
      expect(await Ledger.owner()).to.equal(owner.address);
    });
    it("[Token]: Should assign the total supply of tokens to the owner", async () => {
      const ownerBalance = await DBSToken.balanceOf(owner.address);
      expect(await DBSToken.totalSupply()).to.equal(ownerBalance);
    });

    it("[Token]: Deployer address should have all the total supply", async () => {
      const ownerBalance = await DBSToken.balanceOf(owner.address);
      expect(await DBSToken.totalSupply()).to.equal(ownerBalance);
    });

    it("[Ledger]: Should have the expected params set", async () => {
      expect(await Ledger.name()).to.equal("DragonBallSuperNFT");
      expect(await Ledger.symbol()).to.equal("DBSNFT");
      expect(mintPrice).to.equal(ethers.utils.parseUnits("10", 18));
      expect(await Ledger.communityToken()).to.equal(DBSToken.address);
      expect(await Ledger.owner()).to.equal(owner.address);
    });
  });

  describe("[Dragon Ball Super Token]: Transactions", () => {
    it("Should transfer tokens between accounts", async () => {
      const ownerBalance = await DBSToken.balanceOf(owner.address);

      // Transfer 50 tokens from owner to addr1
      await DBSToken.transfer(addr1.address, 50);
      const addr1Balance = await DBSToken.balanceOf(addr1.address);
      expect(addr1Balance).to.equal(50);

      // Transfer 50 tokens from addr1 to addr2
      // We use .connect(signer) to send a transaction from another account
      await DBSToken.connect(addr1).transfer(addr2.address, 50);
      const addr2Balance = await DBSToken.balanceOf(addr2.address);
      expect(addr2Balance).to.equal(50);
    });

    it("Should fail if sender doesn't have enough tokens", async () => {
      const initialOwnerBalance = await DBSToken.balanceOf(owner.address);

      // Try to send 1 token from addr1 (0 tokens) to owner (1000000 tokens).
      // `require` will evaluate false and revert the transaction.
      await expect(
        DBSToken.connect(addr1).transfer(owner.address, 1)
      ).to.be.revertedWith("ERC20: transfer amount exceeds balance");

      // Owner balance shouldn't have changed.
      expect(await DBSToken.balanceOf(owner.address)).to.equal(
        initialOwnerBalance
      );
    });
  });

  describe("[Dragon Ball Super Ledger]: Transactions", () => {
    it("Should not allow minting if minting is not enabled", async () => {
      await expect(Ledger.connect(addr1).mint(TOKEN_URI)).to.be.revertedWith(
        "Minting not enabled"
      );
    });

    it("Should only allow owner enabling minting", async () => {
      expect(await Ledger.mintEnabled()).to.equal(false);
      await expect(
        Ledger.connect(addr1).setMintingStatus(true)
      ).to.be.revertedWith("Ownable: caller is not the owner");
    });

    it("Should not allow minting if the account did not approve DBS funds for contract to spend", async () => {
      await Ledger.setMintingStatus(true);
      expect(await Ledger.mintEnabled()).to.eq(true);
      expect(await DBSToken.allowance(addr1.address, Ledger.address)).to.equal(
        0
      );
      await expect(Ledger.connect(addr1).mint(TOKEN_URI)).to.be.revertedWith(
        "ERC20: insufficient allowance"
      );
    });

    it("Should allow ledger contract to spend DBSToken minting fee on his behalf", async () => {
      expect(await DBSToken.allowance(addr1.address, Ledger.address)).to.equal(
        0
      );
      await DBSToken.connect(addr1).approve(Ledger.address, mintPrice);
      expect(await DBSToken.allowance(addr1.address, Ledger.address)).to.equal(
        mintPrice
      );
    });

    it("Should not allow minting if the user does not have enough DBSToken funds", async () => {
      await Ledger.setMintingStatus(true);
      expect(await DBSToken.balanceOf(addr1.address)).to.equal(0);
      await expect(Ledger.connect(addr1).mint(TOKEN_URI)).to.be.revertedWith(
        "ERC20: transfer amount exceeds balance"
      );
    });

    it("Should allow minting if the user has enough DBSToken funds", async () => {
      expect(await DBSToken.balanceOf(addr1.address)).to.equal(0);
      await DBSToken.transfer(addr1.address, mintPrice);
      expect(await DBSToken.balanceOf(addr1.address)).to.equal(mintPrice);

      await Ledger.connect(addr1).mint(TOKEN_URI);
      expect(await Ledger.balanceOf(addr1.address)).to.equal(1);
      expect(await DBSToken.balanceOf(addr1.address)).to.equal(0);
      expect(await Ledger._tokenIdCounter()).to.equal(1);

      const mintedTokenId = await Ledger.tokenOfOwnerByIndex(addr1.address, 0);
      expect(await Ledger.tokenURI(mintedTokenId)).to.equal(TOKEN_URI);
    });

    it("Should allow minting without fees if the user is owner", async () => {
      const ownerBalance = await DBSToken.balanceOf(owner.address);

      await Ledger.connect(owner).safeMint(owner.address, TOKEN_URI);
      await Ledger.connect(owner).safeMint(addr2.address, TOKEN_URI);
      expect(await Ledger.balanceOf(owner.address)).to.equal(1);
      expect(await Ledger.balanceOf(addr2.address)).to.equal(1);
      expect(await DBSToken.balanceOf(owner.address)).to.equal(ownerBalance);
      expect(await Ledger._tokenIdCounter()).to.equal(3);

      const mintedTokenId = await Ledger.tokenOfOwnerByIndex(owner.address, 0);
      expect(await Ledger.tokenURI(mintedTokenId)).to.equal(TOKEN_URI);
    });

    it("Should not allow the user mint more than one NFT", async () => {
      expect(await Ledger.balanceOf(addr1.address)).to.equal(1);
      await expect(Ledger.connect(addr1).mint(TOKEN_URI)).to.be.revertedWith(
        "Community members not allowed to mint twice"
      );
    });

    it("Should have mint price updated by 1%", async () => {
      const expectedMintPrice = ethers.utils.parseUnits(
        `${+mintPrice.toString() * 1.01}`,
        "wei"
      );
      expect(await Ledger.mintPrice()).to.equal(expectedMintPrice);
    });

    it("Should allow owner withdraw total collected mint fee", async () => {
      await expect(Ledger.connect(addr1).withdrawMintFee()).to.be.revertedWith(
        "Ownable: caller is not the owner"
      );
      const expectedTotalMintFee = await DBSToken.balanceOf(Ledger.address);
      const previousOwnerBalance = await DBSToken.balanceOf(owner.address);

      await Ledger.withdrawMintFee();
      const currentOwnerBalance = await DBSToken.balanceOf(owner.address);
      expect(currentOwnerBalance.sub(previousOwnerBalance)).to.equal(
        expectedTotalMintFee
      );
    });
  });
});
