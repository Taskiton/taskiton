import React, { useState } from 'react';
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
        dueDate: ""
    });

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
                    name='taskName' />
            </div>
            <div>
                {/* <InputLabel id="demo-simple-select-label" style={{paddingTop:'5%'}}>Task Details</InputLabel> */}
                <TextareaAutosize aria-label="minimum height" rowsMin={3} placeholder="Enter Details" 
                value={task.taskDetails} onChange={handleChange} className={classes.textField}
                name='taskDetails'/>
            </div>
            <div>
                <InputLabel id="demo-simple-select-label" style={{paddingTop:'5%'}}>Assign To</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={task.assignedTo}
                    onChange={handleChange}
                    name='assignedTo'
                >
                    <MenuItem value={"AU"}>Arsh</MenuItem>
                    <MenuItem value={"YT"}>Yalcin</MenuItem>
                    <MenuItem value={"BK"}>Bhinder</MenuItem>
                </Select>
            </div>
            <div>
                <TextField id="standard-secondary" color="primary"
                    value={task.dueDate} onChange={handleChange} className={classes.textField}
                    name='dueDate' 
                    type="date"
                    defaultValue="2017-05-24"
                    style={{paddingTop:'10%'}}/>
            </div>
            <div>
                <input type="submit" value="Submit" />
            </div>
        </form>
    );
}