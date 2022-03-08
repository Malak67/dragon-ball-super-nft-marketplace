//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721URIStorageUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721EnumerableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract DragonBallSuperLedger is
    ERC721Upgradeable,
    ERC721URIStorageUpgradeable,
    ERC721EnumerableUpgradeable,
    OwnableUpgradeable
{
    using Counters for Counters.Counter;
    Counters.Counter public _tokenIdCounter;

    uint256 public mintPrice;
    ERC20 public communityToken;
    bool public mintEnabled;

    function initialize(ERC20 _communityToken, uint256 _mintPrice)
        public
        initializer
    {
        __ERC721_init("DragonBallSuperNFT", "DBSNFT");
        __ERC721URIStorage_init();
        __ERC721Enumerable_init();
        __Ownable_init();

        mintPrice = _mintPrice;
        communityToken = _communityToken;
    }

    modifier isMintEnabled() {
        require(mintEnabled, "Minting not enabled");
        _;
    }

    function mint(string memory _uri) public isMintEnabled {
        require(
            balanceOf(msg.sender) == 0,
            "Community members not allowed to mint twice"
        );

        communityToken.transferFrom(msg.sender, address(this), mintPrice);

        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, _uri);

        _updateMintPrice();
    }

    function safeMint(address to, string memory uri)
        public
        onlyOwner
        isMintEnabled
    {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }

    function setMintingStatus(bool _mintEnabled) public onlyOwner {
        mintEnabled = _mintEnabled;
    }

    function withdrawMintFee() public onlyOwner {
        uint256 tokens = communityToken.balanceOf(address(this));
        communityToken.transfer(owner(), tokens);
    }

    function _updateMintPrice() private {
        mintPrice = mintPrice + mintPrice / 100;
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(ERC721Upgradeable, ERC721EnumerableUpgradeable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    )
        internal
        virtual
        override(ERC721Upgradeable, ERC721EnumerableUpgradeable)
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function _burn(uint256 tokenId)
        internal
        virtual
        override(ERC721Upgradeable, ERC721URIStorageUpgradeable)
    {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        virtual
        override(ERC721Upgradeable, ERC721URIStorageUpgradeable)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }
}
