// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract fashionSupplyChain {
    struct buyerStruct {
        string name;
        address wallet;
        bool isRegistered;
    }

    struct sellerStruct {
        string name;
        address wallet;
        bool isRegistered; 
    }

    mapping(address => buyerStruct) public buyers;
    mapping(address => sellerStruct) public sellers;

    uint256 buyerCount = 0;
    uint256 sellerCount = 0;

    function registerBuyer(string memory _name) public {
        // Check if user is already registered
        require(
            buyers[msg.sender].isRegistered == false,
            "User is already registered."
        );

        buyerCount += 1;

        // Add user to mapping
        buyers[msg.sender] = buyerStruct({
            name: _name,
            wallet: msg.sender,
            isRegistered: true
        });
    }

    function loginBuyer() public view returns (bool) {
        // Check if user is registered
        return buyers[msg.sender].isRegistered;
    }

    function registerSeller(string memory _name) public {
        // Check if user is already registered
        require(
            sellers[msg.sender].isRegistered == false,
            "User is already registered."
        );

        buyerCount += 1;

        // Add user to mapping
        sellers[msg.sender] = sellerStruct({
            name: _name,
            wallet: msg.sender,
            isRegistered: true
        });
    }

    function loginSeller() public view returns (bool) {
        // Check if user is registered
        return sellers[msg.sender].isRegistered;
    }

    function paySeller(address _seller) public payable {
        payable(_seller).transfer(msg.value);
    }
}