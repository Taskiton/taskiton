import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import TaskPieChart from './TaskPieChart';
import UserLineChart from './UserLineChart';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
    userLineChart: {
        height: '91vh',
        marginTop: '2%',
    }, generalStat: {
        height: '40vh',
    }, taskPieChart: {
        height: '45.5vh',
    }

}));

export default function Analytics() {

    const classes = useStyles();

    return (
        <div>
            <Grid container>
                <Grid item xs={12} sm={5} >
                    <Grid item xs={12} className={classes.generalStat}>
                        <Paper style={{ width: '50%', margin: 'auto', height: '80%', textAlign: 'center' }}>
                            <div style={{position:'relative', top:'25%', color:'#F76C6C'}}>
                                <h2>Total Tasks:</h2>
                                <h2>250</h2>
                            </div>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} className={classes.taskPieChart}>
                        <TaskPieChart />
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={7} className={classes.userLineChart}>
                    <UserLineChart/> 
                </Grid>

            </Grid>
        </div>
    );
}