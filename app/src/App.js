import logo from './logo.svg';
import './App.css';
import { Web3 } from 'web3';
import React, { useEffect, useState } from 'react';
import TodoList from './contracts/TodoList.json'

window.web3 = new Web3(window.web3.currentProvider);
const web3 = window.web3

const App = () => {
  const [accounts, setAccounts] = useState('TodoList')
  const [name, setName] = useState('')

  useEffect(() => {
    getAccounts();
    getName();
  }, [])

  const getAccounts = async () => {
    const accounts  = await web3.eth.getAccounts()
    setAccounts(accounts)
  }

  const getName = async () => {
    const networkId = await web3.eth.net.getId()
    const todoList = new web3.eth.Contract(TodoList.abi, TodoList.networks[networkId].address)
    const name = await todoList.methods.name().call()
    setName(name)
  }

  return (
    <div className="App">
      <nav style={{height: '50px', width: '100%', textAlign: 'right'}}>
        {name} - {accounts[0]}
      </nav>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
