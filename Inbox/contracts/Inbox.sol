pragma solidity ^0.4.17;

contract Inbox {
    string public message;

    function Inbox(string initialmsg) public {
        message = initialmsg;
    }

    function setMsg (string newMsg) public {
        message = newMsg;
    }

}
