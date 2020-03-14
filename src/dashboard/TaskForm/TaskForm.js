import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

const useStyles = makeStyles(theme => ({
    textField: {
        paddingBottom: 20,
    }
}));

export default function TaskForm(props) {

    const classes = useStyles();
    const [task, setTask] = useState({
        taskName: "",
        taskDetails: "",
        assignedTo: "",
        dueDate: "",
    });

    const [users, setUsers] = useState([]);
    useEffect(() => {
        let url = "http://localhost:3000/users";
        fetch(url, {
            method: 'GET',
            headers: { 'Accept': 'application/json, text/plain, */*'
            ,'Content-Type': 'application/json' }
        }).then(response => {
            if (response.status >= 400) {
                alert("Error - refresh page and try again");
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            setUsers(data);
        }).catch(function (err) {
            alert("Error - refresh page and try again");
            console.log(err)
        });
    }, [])

    let handleChange = (event) => {
        const { name, value } = event.target;
        setTask(prevState => {
            return {
                ...prevState,
                [name]: value,
            }
        });
    }

    return (
        <form onSubmit={(event) => {
            props.handleAddNewTaskSubmit(task, event)
        }}>
            <div>
                <TextField id="standard-secondary" label="Task Name" color="primary"
                    value={task.taskName} onChange={handleChange} className={classes.textField}
                    name='taskName' required/>
            </div>
            <div>
                {/* <InputLabel id="demo-simple-select-label" style={{paddingTop:'5%'}}>Task Details</InputLabel> */}
                <TextareaAutosize aria-label="minimum height" rowsMin={3} placeholder="Enter Details" 
                value={task.taskDetails} onChange={handleChange} className={classes.textField}
                name='taskDetails'/>
            </div>
            <div>
                <InputLabel id="demo-simple-select-label" style={{paddingTop:'5%'}}>Assign To</InputLabel >
                <Select
                    native
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={task.assignedTo}
                    onChange={handleChange}
                    name='assignedTo' 
                required>
                    <option value="" hidden>Select a user</option>
                    {users.map(user=> <option value={user.name}>{(user.name).split(" ")[0]}</option>
                    )}
                </Select>
            </div>
            <div>
                <TextField id="datetime-local" color="primary"
                    value={task.dueDate} onChange={handleChange} className={classes.textField}
                    name='dueDate' 
                    type="datetime-local"
                    defaultValue="2017-05-24"
                    style={{paddingTop:'10%'}}/>
            </div>
            <div>
                <input type="submit" value="Submit" />
            </div>
        </form>
    );
}