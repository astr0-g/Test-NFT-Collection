// SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;
// This is just a test NFT collections that helps decentralized Finance, NFT Finance, Social Finance and others kind Dapps building on testnet.

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Burnable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import "@openzeppelin/contracts/token/common/ERC2981.sol";

error Not__EnoughAmount();
error Not__AllowedAmount();

// This is just a test NFT collections that helps decentralized Finance, NFT Finance, Social Finance and others kind Dapps building on testnet.
contract Nyancat is ERC1155, ERC1155Burnable, ERC1155Supply, ERC2981, Ownable {
    uint256 public totalSupply;
    uint256 public constant maxSupply = 1250;
    struct tokenInfo {
        uint256 tokenId;
    }
    mapping(uint256 => uint256) public tokenIds;
    mapping(address => uint256) public mintCount;
    mapping(uint256 => tokenInfo) public avaliableToken;
    uint256 public avaliableTokens = 25;
    string private _name = "Nyan Cat";
    string private _symbol = "NYAN";
    uint256 private _price = 0.01 ether;
    uint256 public mintLimit = 2;

    constructor()
        ERC1155(
            "https://gateway.pinata.cloud/ipfs/QmUbYfuTGNpNfFdMzSmkSVZxC5iGhaDpcR8YH8gJgDb2xo/{id}.json"
        )
    {
        for (uint256 i = 0; i < 25; i++) {
            avaliableToken[i].tokenId = i;
        }
    }

    modifier mintRequire() {
        require(totalSupply + 1 <= maxSupply, "Max supply exceeded!");
        _;
    }

    function randomIndex(uint256 _number) public view returns (uint256) {
        return (block.timestamp % _number);
    }

    function mint() external payable mintRequire {
        if (msg.value < _price) revert Not__EnoughAmount();
        if (mintCount[msg.sender] + 1 > mintLimit) revert Not__AllowedAmount();
        if (avaliableTokens == 0) revert Not__EnoughAmount();
        uint256 idToMintIndex = randomIndex(avaliableTokens);
        _mint(msg.sender, avaliableToken[idToMintIndex].tokenId, 1, "");
        tokenIds[avaliableToken[idToMintIndex].tokenId]++;
        if (tokenIds[avaliableToken[idToMintIndex].tokenId] >= 50) {
            if (avaliableTokens + 1 == idToMintIndex + 1) {
                avaliableTokens -= 1;
            } else {
                avaliableToken[idToMintIndex].tokenId = avaliableToken[avaliableTokens - 1]
                    .tokenId;
                avaliableTokens -= 1;
            }
        }
        totalSupply += 1;
        mintCount[msg.sender] += 1;
    }

    function name() public view returns (string memory) {
        return _name;
    }

    function symbol() public view returns (string memory) {
        return _symbol;
    }

    function withdraw() public onlyOwner {
        (bool os, ) = payable(owner()).call{value: address(this).balance}("");
        require(os);
    }

    // The following functions are overrides required by Solidity.
    function _beforeTokenTransfer(
        address operator,
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) internal override(ERC1155, ERC1155Supply) {
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view override(ERC1155, ERC2981) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
// This is just a test NFT collections that helps decentralized Finance, NFT Finance, Social Finance and others kind Dapps building on testnet.
