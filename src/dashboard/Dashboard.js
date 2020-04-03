import React from 'react';
import Kanban from './kanban/Kanban';
import TeamChat from './TeamChat/Chat';
import Announcement from './Announcement';
import Sample from './Sample';
import TeamList from './TeamList/TeamList';
import './dashboard.css';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
    gridTeam: {
        boxShadow: "2px 3px 5px #888888",
        width:"5vw",
        height:"92vh", 
        display:"flex",
        borderRadius: "2%",
        justifyContent: "center",
        alignItems: "baseline",       
        [theme.breakpoints.down('xs')]: {
            // display:"none",
            width:"100%",
            height:"7vh",
            position:"fixed",
            bottom:0,
            boxShadow: "2px 3px 5px #888888",
            backgroundColor:'#ebecf0'

        }
    },
    gridKanban: { 
        width:"70vw",
        height:"91vh",
        overflow: "auto",
        [theme.breakpoints.down('xs')]: {
            width:"100vw",
            marginBottom:'2vh'
        }
    },
    gridChat: {
        boxShadow: "2px 3px 5px #888888",
        width:"25vw",
        height:"91vh",
        [theme.breakpoints.down('xs')]: {
            display:"none",
        }
    },
    gridAnnouncement:{
        height:'50%'
    }

}));

export default function Dashboard() {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container spacing={0}>
                <Grid item className={classes.gridTeam}>
                    <TeamList/>
                </Grid>
                <Grid item className={classes.gridKanban}>
                <Kanban/>
                </Grid>
                <Grid item className={classes.gridChat}>
                    {/* <Announcement className={classes.gridAnnouncement}/> */}
                    <TeamChat/>
                </Grid>
            </Grid>
        </div>
    );
}