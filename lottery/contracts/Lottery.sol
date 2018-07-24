pragma solidity ^0.4.17;

contract Lottery {
    address public manager;
    address[] public players;

    function Lottery() public {
        manager = msg.sender;
    }

    function enter() public payable{
        require(msg.value >= .01 ether);
        players.push(msg.sender);
    }

    function pickWinner() public restricted {
        //require(msg.sender == manager);
        uint index = random() % players.length;
        players[index].transfer(this.balance);
        players = new address[](0);
    }

    function random() private view returns (uint) {
        //psuedo random number generator
        return uint(keccak256(block.difficulty, now, players));
        //sha3(block.difficulty, now, players);
    }
    //any function with the name of modifier beside it runs anything in modifer function
    //first and then runs the function code
    modifier restricted() {
        require(msg.sender == manager);
        _;
    }

    function getPlayers() public view returns(address[]) {
        return players;
    }

}
