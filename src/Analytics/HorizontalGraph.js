import React, { useState, useEffect } from "react";
import Chart from "react-google-charts";
import { Bar, Doughnut, HorizontalBar } from "react-chartjs-2";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";

export default function HorizontalGraph() {
  const [data, setData] = useState([]);
  const [users, setUsers] = useState([]);

  const [assignedUser, setassignedUser] = useState({
    username: "Yalcin Tatar",
  });

  // useEffect(() => {
  //     const url = 'http://localhost:3305/tasks/analyze';
  // fetch(url, {
  //     headers: { 'Content-Type': 'application/json' },

  // }).then(function (response) {
  //     // console.log(response.status)
  //     if (response.status >= 400) {
  //         throw new Error("Bad response from server");
  //     }
  //     return response.json();
  // }).then(function (result) {
  //     console.log(result)
  //   //  var taskArray = Object.values(result);
  //   //  console.log(taskArray)
  //    let taskUser = []
  //    let taskCount = []
  //     for(let i = 0; i<result.length; i++){

  //         taskUser.push(result[i].column_title)
  //         taskCount.push(result[i].task_count)
  //     }
  //     console.log(taskCount)
  //     console.log(taskUser)

  // setData({
  //     labels: taskUser,
  //     datasets: [{
  //       label: '# of Votes',
  //       data: [4,2,2],
  //       backgroundColor: 'rgba(255,99,132,0.2)',
  //       borderColor: 'rgba(255,99,132,1)',
  //       borderWidth: 1,
  //       hoverBackgroundColor: 'rgba(255,99,132,0.4)',
  //       hoverBorderColor: 'rgba(255,99,132,1)'

  //     }]
  //   })
  //     if(result.code === 204){
  //         alert(result.success);
  //     }else if (result.code === 200){

  //     }
  // }).catch(function (err) {
  //     console.log(err)
  // });

  // }, [setData]);

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
      .then((users) => {
        console.log("Yalcin", users);
        setUsers(users);
        console.log(assignedUser);
      })
      .catch(function (err) {
        alert("Error - refresh page and try again");
        console.log(err);
      });
  }, []);

  let handleChange = (event) => {
    let name = "";
    let value = "";
    if (typeof event.target !== "undefined") {
      name = event.target.name;
      value = event.target.value;
    }
    setassignedUser((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
    console.log(assignedUser);
  };
  return (
    <div className="App">
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
          value={assignedUser.username}
          onChange={(event) => handleChange(event)}
          name="username"
          required
        >
          {users.map((user) => (
            <option key={user.user_id} value={user.name}>
              {user.name.split(" ")[0]}
            </option>
          ))}
        </Select>
      </div>
      <div>
        <Doughnut data={data} />
      </div>
    </div>
  );
}
