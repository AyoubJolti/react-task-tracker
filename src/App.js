import logo from './logo.svg';
import './App.css';
import Header from './compenents/Header';
import Tasks from './compenents/Tasks';
import AddTask from './compenents/AddTask';
import { useState } from 'react'

function App() {
  const [showAddTask,setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState( [
    {
      id: 1,
      text: 'Doctors Appointment',
      day: 'Feb 5th at 2:30pm',
      reminder: true,
    },
    {
      id: 2,
      text: 'Meeting at School',
      day: 'Feb 6th at 1:30pm',
      reminder: true,
    },
    {
      id: 3,
      text: 'Food Shopping',
      day: 'Feb 5th at 2:30pm',
      reminder: false,
    }
  ])
  const DeleteTask = (id) =>{
    // eslint-disable-next-line no-restricted-globals
    if(confirm('Are you sure?')){
      setTasks(tasks.filter((task)=>task.id !== id));
    }

  }
  const ToggleReminder = (id) =>{
    setTasks(
        tasks.map((task)=>
        task.id === id ? {...task,reminder:!task.reminder}:task
    )
    )
  }
  const addTask = (task)=>{
    const lastElement = tasks[tasks.length - 1]
    const id = lastElement.id + 1;
    task.id = id;
    tasks.push(task)
    setTasks([...tasks]);
    alert('Task Added'+task.id);
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
    </div>
  );
}


export default App;