// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

contract TodoList {
  string public name;
  uint public count = 0;

  struct List {
    uint id;
    string content;
    bool completed;
  }

  mapping(uint => List) public list;

  event TaskCreated (
    uint id,
    string content,
    bool completed
  );


  constructor() {
    name = "deepak";
    createTask("call doctor");
  }

  function createTask(string memory _content) public {
    count ++;
    list[count] = List(count, _content, false);
    emit TaskCreated(count, _content, false);
  }




}
