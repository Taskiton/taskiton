import React from 'react';
import Kanban from './Kanban';
import './dashboard.css';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
    gridTeam: {
        backgroundColor:"blue",
        width:"5vw",
        height:"91vh",        
        [theme.breakpoints.down('xs')]: {
            display:"none",
        }
    },
    gridKanban: {
        backgroundColor:"red", 
        width:"65vw",
        height:"91vh",
        overflow: "auto",
        [theme.breakpoints.down('xs')]: {
            width:"100vw",
        }
    },
    gridChat: {
        backgroundColor:"yellow", 
        width:"30vw",
        height:"91vh",
        [theme.breakpoints.down('xs')]: {
            display:"none",
        }
    }

}));

export default function Dashboard() {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container spacing={0}>
                <Grid item className={classes.gridTeam}>
                </Grid>
                <Grid item className={classes.gridKanban}>
                    <Kanban/>
                </Grid>
                <Grid item className={classes.gridChat}>
                </Grid>
            </Grid>
        </div>
    );
}