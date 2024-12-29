import logo from './logo.svg';
import './App.css';
import Header from './compenents/Header';
import Tasks from './compenents/Tasks';
import Footer from './compenents/Footer';
import AddTask from './compenents/AddTask';
import About from './compenents/About';
import { useState ,useEffect} from 'react'

function App() {
  const [showAddTask,setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState( [])
  const fetchTasks = async () =>{
    const res = await  fetch('http://localhost:5000/tasks');
    const data = await res.json();
    return data;
  }
  const fetchTask = async (id) =>{
    const res = await  fetch('http://localhost:5000/tasks/'+id);
    const data = await res.json();
    return data;
  }
  useEffect(()=>{
    const getTasks = async () =>{
     const tasksFromServer = await fetchTasks();
     setTasks(tasksFromServer);
    }
    getTasks();
  },[])
  const DeleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE',
    })
    // eslint-disable-next-line no-restricted-globals
      setTasks(tasks.filter((task) => task.id !== id));

  }
  const ToggleReminder = async (id) =>{
    const task = await  fetchTask(id);
    const toggleTask = {...task,reminder:!task.reminder};
    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers:{
        'Content-type':'application/json'
      },
      body: JSON.stringify(toggleTask),
    })
const data = await res.json();
    setTasks(
        tasks.map((task)=>
            task.id === id ? {...task,reminder:!task.reminder}:task
        )
    )
  }
  const addTask = async (task)=>{
    const lastElement = tasks[tasks.length - 1]
    const id = lastElement.id + 1;
    task.id = id;
    const  res = await fetch(`http://localhost:5000/tasks`, {
      method: 'POST',
      headers:{
        'Content-type':'application/json'
      },
      body: JSON.stringify(task),
    })
    const  data = await res.json();
    setTasks([...tasks,data]);
  }
  const onClickAdd =() =>{
    setShowAddTask(!showAddTask);
  }

  return (
    <div className="container">
      {showAddTask ? <AddTask onAdd={addTask}></AddTask> :""}

      <Header textButton={showAddTask ?'closeButtonAdd' : 'showButtonAdd'} onClickAdd={onClickAdd} title="Task Tracker"/>
      {tasks.length>0 ?
          <Tasks
              tasks={tasks}
              OnDelete={DeleteTask}
              OnToggle={ToggleReminder}
          ></Tasks>
          : <p className='task'>No Tasks To show</p>}
      <Footer></Footer>
    </div>
  );
}


export default App;