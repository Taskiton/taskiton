import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import TaskPieChart from "./TaskPieChart";
import UserLineChart from "./UserLineChart";
import HorizontalGraph from "./HorizontalGraph";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  userLineChart: {
    height: "91vh",
    padding: "5vw",
    // marginTop: '2%',
  },
  generalStat: {
    height: "40vh",
  },
  taskPieChart: {
    padding: "5vw",
    height: "45.5vh",
  },
  chartPos: {
    padding: "20px",
  },
  chartHeadline: {
    textAlign: "center",
  },
}));

export default function Analytics() {
  const classes = useStyles();
  const [task, setTasks] = useState();

  useEffect(() => {
    const url = "https://server.taskiton.wmdd.ca/task";
    fetch(url, {
      headers: { "Content-Type": "application/json" },
    })
      .then(function (response) {
        // console.log(response.status)
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response.json();
      })
      .then((result) => {
        console.log(result[0].taskcount);
        setTasks(result[0].taskcount);
      });
  });

  return (
    <div>
      <Grid container>
        <Grid item xs={12} sm={12}>
          <Grid item xs={12} className={classes.generalStat}>
            <Paper
              style={{
                width: "50%",
                margin: "auto",
                height: "80%",
                textAlign: "center",
              }}
            >
              <div
                style={{ position: "relative", top: "25%", color: "#F76C6C" }}
              >
                <h2>Total Tasks:</h2>
                <h2>{task}</h2>
              </div>
            </Paper>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6} className={classes.taskPieChart}>
          <Paper className={classes.chartPos} elevation={3}>
            <h2 className={classes.chartHeadline}>All Tasks</h2>
            <TaskPieChart />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} className={classes.userLineChart}>
          <Paper className={classes.chartPos} elevation={3}>
            <h2 className={classes.chartHeadline}>Completed tasks by users</h2>
            <UserLineChart />
          </Paper>
        </Grid>
        {/* In progress */}
        {/* <Grid item xs={12} sm={12} className={classes.userLineChart}>
                    <Paper className={classes.chartPos} elevation={3} >
                        <h2 className={classes.chartHeadline}>Completed tasks by users</h2>
                    <HorizontalGraph/> 
                    </Paper>
                </Grid> */}
      </Grid>
    </div>
  );
}
