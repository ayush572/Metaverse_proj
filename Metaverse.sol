// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Metaverse is ERC721URIStorage {

    //counters library to increase the nft counter
    using Counters for Counters.Counter;
    Counters.Counter private supply; //to keep on counting the objects that are being created.
    uint public maxSupply = 100; //max nft that can be minted from the website
    uint public cost = 1 ether; //cost of the nft that will be minted

    constructor() ERC721("Meta", "MTA") {}


    //now the nft that we will be minting has a lot of different properties with it like
    //width, height, depth, etc...
    struct Object{
        string name; //name of the nft
        int8 w;
        int8 h;
        int8 d;
        int8 x;
        int8 y;
        int8 z;
    }

    
    //now we will be creating a mapping for the objects that will be minted for the particular owner.
    mapping(address => Object[]) NFTOwners;
    Object[] public objects; //creating an array of Objects denoted by objects

    //use memory keyword for the reference type variable
    function getObjects() public view returns(Object[] memory)
    {   
        return objects;
    }

    function totalSupply() public view returns (uint){
        return supply.current();
    }

    //function for nft minting -> payable as well because the person who will be calling this function will be sending the 
    //ethers to the smart contract
    function mintNFT(string memory _objnm, int8 _w, int8 _h, int8 _d, int8 _x, int8 _y,int8 _z) public payable{
        require(supply.current()<=maxSupply, "Supply exceeds maximum");

        //msg.value -> basically the cost that the user is paying for the nft to be minted
        //msg.value is the amount that is being sent by the user
        require(msg.value>=cost,"Insufficient Payment");
        supply.increment();

        //msg.sender -> the person who has called this function
        _mint(msg.sender, supply.current()); //supply.current() -> unique token ID for the NFT to be minted at msg.sender addr

        //creating a new object with the following properties
        Object memory _newObj = Object(_objnm, _w, _h, _d, _x, _y, _z);

        //adding the newly created object into objects array
        //we are maintaining an array so as to keep a track that which all nft's have been minted
        objects.push(_newObj);
        NFTOwners[msg.sender].push(_newObj);
    }
    

    //now, the amount that the buyer would have paid to the get the NFT, goes into the smart contract.
    //from the smart contract, it needs to get withdrawn buy the deployer of the smart contract


    //from Ownable.sol in the access library, we directly have the inbuilt functions for the same, for the owner
    function withdraw() external payable{
        //external functions cannot be called internally 
        //used to deal with large amount of array data
        uint256 balance = address(this).balance; //getting the balance of the smart contract
        payable(msg.sender).transfer(balance); //transfering the amount from smart contract to the owner of smart contract
    }

    //to get all the objects / nft's that a particular buyer has bought
    function getOwnerObjects() public view returns(Object[] memory){

        //all the objects associated with the person who has called the smart contract function
        return NFTOwners[msg.sender];
    }
}   