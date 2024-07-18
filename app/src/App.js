import logo from './logo.svg';
import './App.css';
import { Web3 } from 'web3';
import React, { useEffect, useState } from 'react';
import TodoList from './contracts/TodoList.json'

window.web3 = new Web3(window.ethereum);
const web3 = window.web3

const networkId = await web3.eth.net.getId()
const contract = new web3.eth.Contract(TodoList.abi, TodoList.networks[networkId].address)

const App = () => {
  const [accounts, setAccounts] = useState('')
  const [name, setName] = useState('')
  const [tasks, setTasks] = useState(null)
  const [newTask, setNewTask] = useState('')

  useEffect(() => {
    getAccounts();
    getTasks();
  }, [])


  const getAccounts = async () => {
    const accounts = await web3.eth.getAccounts()
    setAccounts(accounts)
  }


  const getTasks = async () => {
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

    return tasks.map((task, index) => 
      <p key={index}>{task.content}</p>
    )
  }

  const handleSubmit = async (event) => {
   event.preventDefault();
   console.log("submitting...")
   const newCreatedTask = await contract.methods.createTask(newTask).send({from: accounts[0]})
   console.log("submitted", newCreatedTask)
   window.location.reload()
  }

  const handleChange = (event) => {
    setNewTask(event.target.value)
  }

  return (
    <div className="App">
      <nav style={{ height: '50px', width: '100%', textAlign: 'right', background: "#ccc" }}>
        {name} - {accounts[0]}
      </nav>
      <main>
        <form type="submit" onSubmit={handleSubmit}>
          <input type="text" onChange={handleChange} value={newTask}/>
        </form>
        <hr></hr>
        <h1>Display list</h1>
        {displayList()}
      </main>
    </div>
  );
}

export default App;
