import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import DateFnsUtils from '@date-io/date-fns';
import { DateTimePicker, MuiPickersUtilsProvider} from '@material-ui/pickers';

const useStyles = makeStyles(theme => ({
    textField: {
        paddingBottom: 20,
    }
}));


export default function TaskForm(props) {

    var date = (new Date());
    date.setDate(date.getDate() + 1);
    const classes = useStyles();
    const [task, setTask] = useState({
        taskName: "",
        taskDetails: "",
        assignedTo: "",
        dueDate: date.toLocaleDateString('en-US'),
    });

    const [users, setUsers] = useState([]);
    useEffect(() => {
        let url = "http://api.taskiton.wmdd.ca/userlist";
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
        let name='';
        let value='';
        if(typeof event.target !== 'undefined') {
            name = event.target.name;
            value = event.target.value;
        }
        else {
            name = 'dueDate';
            value = event.toLocaleDateString('en-US');
        }

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
            <br/>
            <div>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DateTimePicker value={task.dueDate} onChange={handleChange} name='dueDate' disablePast/>
                </MuiPickersUtilsProvider>
            </div>
            <br/>
            <div>
                <input type="submit" value="Submit" />
            </div>
        </form>
    );
}