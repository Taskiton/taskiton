import React, { useState, useEffect } from 'react';
import {signupPageStyle} from '../SignupStyle';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';


const useStyles = signupPageStyle

export default function FormItem (props){
    const classes = useStyles();
    const formItem = {
        width: '100%',
        marginTop:'2.5vh',
        color:'secondary',
        marginLeft: 'auto',
        '&:active': {
            boxShadow: 'none',
            backgroundColor: '#F76C6C',
            borderColor: '#F76C6C',
          },
    }
    return(
        <Grid item xs={12}>
                <TextField required color="secondary" type={props.type}style={formItem} name={props.name} label={props.label} value={props.value} onChange={props.onChange} variant="outlined" />
        </Grid>
    )
}
