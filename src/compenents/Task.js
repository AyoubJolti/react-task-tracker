import {FaTimes} from "react-icons/fa";

const Task = ({task,OnDelete,OnToggle}) => {
    return (
        <div className={task.reminder ? 'task reminder':'task'} onDoubleClick={()=>OnToggle(task.id)} >
            <h3 >{task.text} <FaTimes style={styleFaTimes} onClick={()=>OnDelete(task.id)} ></FaTimes></h3>
            <p >{task.day}</p>
        </div>
    )
}
const styleFaTimes = {
    color:'red',backgroundColor :'black',cursor:'pointer'
}
export default Task