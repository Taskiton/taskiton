import React, { useState } from 'react';

export default function EditTaskForm(props) {

    const [task, setTask] = useState({
        taskDetails:props.editTaskDetails,
        assignedTo:props.editAssignedTo,
    });

    let handleChange = (event) => {
        const { name, value } = event.target
        setTask(prevState=>{
            return{
                ...prevState,
                [name]: value,
            }
        })
    }

    return (
        <div>
            <form onSubmit={(event)=>{
                props.handleEditTaskSubmit(task, event, props.editTaskId)
                }}>
                <label>
                    Task details:
                    <input type="text" value={task.taskDetails} name="taskDetails" onChange={handleChange} />
                </label>
                <br/>
                <label>
                    Assigned to:
                    <input type="text" value={task.assignedTo} name="assignedTo" onChange={handleChange} />
                </label>
                <br/><br/>
                <input type="submit" value="Submit" />
            </form>
            <br/>
            <input type="button" value="Delete" 
                onClick={()=>{props.handleEditNewTaskDelete(props.editTaskId)}}/>
        </div>
    );
}