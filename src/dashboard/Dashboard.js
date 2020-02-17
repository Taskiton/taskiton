import React from 'react';
import Kanban from './Kanban';

import { makeStyles } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
    mainGrids: {
        width: "32vw",
        height: "90vh",
        [theme.breakpoints.down('xs')]: {
            width: "100vw",
        }
    }
}));

export default function Dashboard() {

    const classes = useStyles();

    return (
        <div>
            <Kanban/>
        </div>
    );
}