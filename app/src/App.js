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
  const [tasks, setTasks] = useState(null)

  useEffect(() => {
    getAccounts();
    getTasks();
  }, [])

  const getAccounts = async () => {
    const accounts = await web3.eth.getAccounts()
    setAccounts(accounts)
  }


  const getTasks = async () => {
    const networkId = await web3.eth.net.getId()
    const contract = new web3.eth.Contract(TodoList.abi, TodoList.networks[networkId].address)
    const name = await contract.methods.name().call()
    setName(name)

    const count = await contract.methods.count().call()
   
    const allTasks = []
    for(var i=1; i <= count; i++) {
      const task = await contract.methods.list(i).call();
      allTasks.push(task)
    }
    setTasks(allTasks)
  }

  const displayList = () => {

    if(!tasks) return

    return tasks.map(task => 
      <p>{task.content}</p>
    )
  }

  return (
    <div className="App">
      <nav style={{ height: '50px', width: '100%', textAlign: 'right' }}>
        {name} - {accounts[0]}
      </nav>
      <header>
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <main>
      {displayList()}
      </main>
    </div>
  );
}

export default App;
