import React, { useState } from 'react';

export default function TaskForm(props) {

    const [taskName, setTaskName] = useState("");

    let handleChange = (event) => {
        setTaskName(event.target.value);
    }

    return (
        <form onSubmit={(event)=>{
            props.handleAddNewTaskSubmit(taskName, event)
            }}>
            <label>
                Task Name:
                <input type="text" value={taskName} onChange={handleChange} />
            </label>
            <label>
                Task Details:
                <input type="text" value={taskName} onChange={handleChange} />
            </label>
            <label>
                Assigned to:
                <input type="text" value={taskName} onChange={handleChange} />
            </label>
            <label>
                Due date:
                <input type="text" value={taskName} onChange={handleChange} />
            </label>
            <input type="submit" value="Submit" />
        </form>
    );
}