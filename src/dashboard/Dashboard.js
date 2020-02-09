import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
}));

export default function Dashboard() {

    const classes = useStyles();

    return (
        <div>
            <Grid container spacing={0}>
                <Grid style= {{width:"31vw"}}>
                    <div style= {{"height":50, "backgroundColor":"yellow"}}></div>
                </Grid>
                <Grid style= {{width:"31vw"}}>
                    <div style= {{"height":50, "backgroundColor":"blue"}}></div>
                </Grid>
                <Grid style= {{width:"31vw"}}>
                    <div style= {{"height":50, "backgroundColor":"red"}}></div>
                </Grid>
                <Grid style= {{width:"7vw"}}>
                    <div style= {{"height":"100vh", "backgroundColor":"grey"}}></div>
                </Grid>
            </Grid>
        </div>
    );
}