import React from 'react';
import './teamList.css';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import { deepOrange, deepPurple } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    avatar: {
        color: theme.palette.getContrastText(deepOrange[500]),
        backgroundColor: "purple",
        width: theme.spacing(6),
        height: theme.spacing(6),
        marginTop: "20px",
    },
}));

export default function TeamList() {

    let classes = useStyles();

    return(
        <div>
            <Avatar className={classes.avatar}>YT</Avatar>
            <Avatar className={classes.avatar}>AU</Avatar>
            <Avatar className={classes.avatar}>AU</Avatar>
            <Avatar className={classes.avatar}>AU</Avatar>
            <Avatar className={classes.avatar}>AU</Avatar>
        </div>
    );
}