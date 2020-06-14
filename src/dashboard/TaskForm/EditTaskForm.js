import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import Paper from "@material-ui/core/Paper";
import DateFnsUtils from "@date-io/date-fns";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  textField: {
    paddingBottom: 20,
    width: "15vw",
  },
  paper: {
    margin: "100px",
  },
}));

export default function EditTaskForm(props) {
  const classes = useStyles();

  const [task, setTask] = useState({
    taskName: props.task.taskName,
    taskDetails: props.task.details,
    assignedTo: props.task.assignedTo,
    dueDate: props.task.dueDate,
  });

  let handleChange = (event) => {
    let name = "";
    let value = "";
    if (typeof event.target !== "undefined") {
      name = event.target.name;
      value = event.target.value;
    } else {
      name = "dueDate";
      value = event.toLocaleDateString("en-US");
    }
    setTask((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const [users, setUsers] = useState([]);
  useEffect(() => {
    let url = "https://server.taskiton.wmdd.ca/userlist";
    fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status >= 400) {
          alert("Error - refresh page and try again");
        }
        return response.json();
      })
      .then((data) => {
        //console.log(data);
        setUsers(data);
      })
      .catch(function (err) {
        alert("Error - refresh page and try again");
        console.log(err);
      });
  }, []);

  return (
    <div>
      <form
        onSubmit={(event) => {
          props.handleEditTaskSubmit(task, event, props.task.id);
        }}
      >
        <div>
          <TextField
            id="standard-secondary"
            label="Task Name"
            color="primary"
            value={task.taskName}
            onChange={handleChange}
            className={classes.textField}
            name="taskName"
          />
        </div>
        <div>
          {/* <InputLabel id="demo-simple-select-label" style={{paddingTop:'5%'}}>Task Details</InputLabel> */}
          <TextareaAutosize
            aria-label="minimum height"
            rowsMin={3}
            placeholder="Enter Details"
            value={task.taskDetails}
            onChange={handleChange}
            className={classes.textField}
            name="taskDetails"
          />
        </div>
        <div>
          <InputLabel
            id="demo-simple-select-label"
            style={{ paddingTop: "8%", paddingBottom: "3%" }}
          >
            Assign To
          </InputLabel>
          <Select
            native
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={task.assignedTo}
            onChange={handleChange}
            name="assignedTo"
            required
          >
            <option value="" hidden>
              Select a user
            </option>
            {users.map((user) => (
              <option
                key={user.user_id}
                value={user.name.split(" ")[0][0] + user.name.split(" ")[1][0]}
              >
                {user.name.split(" ")[0]}
              </option>
            ))}
          </Select>
        </div>
        <div>
          <InputLabel
            id="demo-simple-select-label"
            style={{ paddingTop: "10%", paddingBottom: "3%" }}
          >
            Due Date:
          </InputLabel>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DateTimePicker
              value={task.dueDate}
              onChange={handleChange}
              name="dueDate"
              disablePast
            />
          </MuiPickersUtilsProvider>
        </div>
        <br />
        <div style={{ width: "100%", textAlign: "center" }}>
          {/* <input type="submit" value="Submit" /> */}
          <Button type="submit" variant="contained" color="primary">
            Save
          </Button>
          <Button
            variant="contained"
            style={{ marginLeft: "5%" }}
            onClick={props.closeModal}
          >
            Cancel
          </Button>
        </div>
      </form>
      <br />
      <div style={{ width: "100%", textAlign: "center" }}>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            props.handleEditNewTaskDelete(props.task.id);
          }}
        >
          Delete
        </Button>
      </div>
      {/* <input type="button" value="Delete"
                onClick={() => { props.handleEditNewTaskDelete(props.task.id) }} /> */}
    </div>
  );
}
