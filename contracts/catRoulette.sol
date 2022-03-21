// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol";

contract CatRoulette is ERC721Enumerable, Ownable {
    using Strings for uint256;

    uint256 public price1 = 0.15 ether;
    uint256 public price2 = 0.20 ether;
    uint256 public price3 = 0.25 ether;
    uint256 public txLimit = 10;
    uint256 public publicSaleStarts;
    uint256 public MAX_SUPPLY = 500;

    bool public isRevealed;

    string public baseURI;
    string public baseExtension = ".json";

    constructor(
        string memory _newURI,
        uint256 _publicSaleTime,
        address _owner
    ) ERC721("CatRoulette", "CRLT") {
        baseURI = _newURI;
        publicSaleStarts = _publicSaleTime;
        _transferOwnership(_owner);
    }

    function mint(uint256 _amount) payable external {
        require(totalSupply() + _amount <= MAX_SUPPLY, "exceeds max supply");
        require(_amount <= txLimit, "exceeds max buy amount");
        uint256 price;

        uint256 _tokenId = totalSupply() + 1;

        for (uint256 i = 0; i < _amount; i++) {
            _mint(msg.sender, _tokenId + i);
            price += getPrice(_tokenId + i);
        }

        require(price <= msg.value, "not enough BNB to buy");
    }

    function getPrice(uint256 _tokenId) internal view returns (uint256) {
        if (_tokenId <= 150) {
            return price1;
        } else if (_tokenId <= 300) {
            return price2;
        } else {
            return price3;
        }
    }

    function withdraw() public onlyOwner {
        payable(msg.sender).transfer(address(this).balance);
    }

    function setReveal(
        string memory _newURI,
        string memory _newExtension,
        bool status
    ) public onlyOwner {
        baseURI = _newURI;
        baseExtension = _newExtension;
        isRevealed = status;
    }

    function changeValues(
        uint256 _price1,
        uint256 _price2,
        uint256 _price3,
        uint256 _txLimit
    ) public onlyOwner {
        price1 = _price1;
        price2 = _price2;
        price3 = _price3;
        txLimit = _txLimit;
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721)
        returns (string memory)
    {
        require(_exists(tokenId), "Cannot query non-existent token");

        if (!isRevealed) {
            return baseURI;
        }

        return
            string(
                abi.encodePacked(baseURI, tokenId.toString(), baseExtension)
            );
    }

    function walletOfOwner(address _owner)
        external
        view
        returns (uint256[] memory)
    {
        uint256 tokenCount = balanceOf(_owner);

        uint256[] memory tokensId = new uint256[](tokenCount);
        for (uint256 i = 0; i < tokenCount; i++) {
            tokensId[i] = tokenOfOwnerByIndex(_owner, i);
        }

        return tokensId;
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return baseURI;
    }

    function changeStartTime(uint256 _publicSaleTime)
        public
        onlyOwner
    {
        publicSaleStarts = _publicSaleTime;
    }
}
