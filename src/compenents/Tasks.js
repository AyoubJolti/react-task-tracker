import Task from "./Task";

const Tasks = ({tasks,OnDelete,OnToggle}) =>{
    return(
        < >
            {tasks.map((task) =>(
                <Task key={task.id} task={task} OnDelete={OnDelete} OnToggle={OnToggle}></Task>
            ))}
        </>
    )
}
export default Tasks