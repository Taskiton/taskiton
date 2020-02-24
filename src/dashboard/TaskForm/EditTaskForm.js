import React, { useState } from 'react';

export default function EditTaskForm(props) {

    const [taskName, setTaskName] = useState("");

    let handleChange = (event) => {
        setTaskName(event.target.value);
    }

    return (
        <div>
            <form onSubmit={(event)=>{
                props.handleAddNewTaskSubmit(taskName, event)
                }}>
                <label>
                    Name:
                    <input type="text" value={taskName} onChange={handleChange} />
                </label>
                <input type="submit" value="Submit" />
            </form>
            <input type="button" value="Delete" 
                onClick={()=>{props.handleEditNewTaskDelete(props.editTaskId)}}/>
        </div>
    );
}