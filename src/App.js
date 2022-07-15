import { useState, useEffect } from "react"
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'

import Header from './components/Header'
import Tasks from './components/Tasks';
import AddTask from "./components/AddTask";
import Footer from "./components/Footer";
import About from "./components/About";

function App() {
  const [tasks, setTasks] = useState([])

  useEffect(() =>{
    const getData = async () => {
      const tasksFromServ = await fetchTasks()
      setTasks(tasksFromServ)
    }
    getData()
  }, [])

  //Fetch 
  const fetchTasks = async() => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()
    return data
  }

  const fetchTask = async(id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()
    return data
  }

const [showAdd, setShowAdd] = useState(false)

//Add
const add = async (task) =>{
  const res = await fetch('http://localhost:5000/tasks', {
    method: 'POST',
    headers: {'Content-type': 'application/json'},
    body: JSON.stringify(task)
  })

  const data = await res.json()

  setTasks([...tasks, data])

  // const id = Math.floor(Math.random() * 10000) + 1

  // const newTask = {id, ...task}
  // setTasks([...tasks, newTask])
}

//Delete
const deleteT = async (id) => {
  await fetch(`http://localhost:5000/tasks/${id}`, {
    method: 'DELETE'
  })

  setTasks(tasks.filter((tasks) => tasks.id !== id))
}
//Reminder
const reminder = async (id) =>{

  const taskToRemind = await fetchTask(id)
  const updatedTask = { ...taskToRemind, reminder: !taskToRemind.reminder}

  const res = await fetch(`http://localhost:5000/tasks/${id}`, {
    method:'PUT',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(updatedTask),

  })
  const data = await res.json()

  setTasks(tasks.map((task) => task.id === id ? {...task, reminder: data.reminder} : task))
}
  return (
    <Router>
    <div className="container">
      <Header onAdd={() => setShowAdd(!showAdd)} showAdd = {showAdd} title='Task Tracker'/>
      <Routes>
        <Route path = '/' element={
          <>
          {showAdd && <AddTask onAdd={add}/>}
          {tasks.length > 0 ?<Tasks tasks={tasks} onDelete={deleteT} onToggle={reminder}/> : 'No Tasks to Show'}
          </>
        }/>
      <Route path='/About' element={<About />}/>
      </Routes>
      <Footer />
    </div>
    </Router>
  );
}

export default App;
