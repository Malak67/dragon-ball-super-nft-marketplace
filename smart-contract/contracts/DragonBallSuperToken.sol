// SPDX-License-Identifier: MIT

pragma solidity ^0.8.12;
import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";

contract DragonBallSuperToken is ERC20Upgradeable {
    function initialize(uint256 initialSupply) public initializer {
        __ERC20_init("Dragon Ball Super Token", "DBS");
        _mint(msg.sender, initialSupply);
    }
}
