import React, { useState, useEffect } from 'react';
import { loginPageStyle } from './LoginStyle';
import { palette } from '@material-ui/system';
import Button from '@material-ui/core/Button';
import {Redirect} from 'react-router';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormItem from './components/formItem'
import signupLogo from '../images/signupImage.svg'


const useStyles = loginPageStyle

export default function Login() {

    const [user, setUser] = useState({
        mail: "",
        password: ""

    });

    const classes = useStyles();
    const frmStyle = {
        height: '75vh',
        paddingLeft: '7vw',
        paddingRight: '7vw',
        paddingTop: '5vh',
        // boxShadow: 'rgb(216, 215, 215) 1px 2px 10px 2px',
    }

    function handleSubmit(event) {
        event.preventDefault()
        var data = {
            mail: user.mail,
            password: user.password,
        }
        console.log(data);
        fetch("http://localhost:3003/user_create", {
            method: 'POST',
            mode: 'cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }).then(function (response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then(function (data) {
            console.log(data);
            if (data == "success") {

            }
        }).catch(function (err) {
            console.log(err)
        });
        console.log(data);
    }
    function handleChange(event) {
        const { name, value } = event.target
        
        //In progress
        if(name === 'mail'){
            const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
             if(!validEmailRegex.test(value)){
                // console.log(FormItem().formIte)
                console.log('This is not email Adress');
             }
        }
        setUser(prevState => {
            // console.log(prevState)
            return {
                ...prevState,
                [name]: value
            }    
        });
    }

    return (
        <div className={classes.formStyle}>
            <Grid container>
                <Grid item xs={12} sm={6}>
                    <img className={classes.signupImage} src={signupLogo}></img>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <form onSubmit={(event) => handleSubmit(event)} style={frmStyle} noValidate autoComplete="off">
                        <h1 style={{ textAlign: 'center', fontSize: '2.1em', marginTop: '0', color: 'black' }}>Login To System</h1>
                        <FormItem style={{ marginTop: '1vh' }} label="Email" name='mail' value={user.mail} onChange={(event) => handleChange(event)} />
                        <FormItem type='password' label="Password" name='password' value={user.password} onChange={(event) => handleChange(event)} />
                        <Button  className={classes.loginButton} variant="contained" color="primary" on> LOGIN </Button>
                    </form>
                </Grid>
            </Grid>
        </div>
    );
}