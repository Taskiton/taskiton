import React, { useState, useEffect, useContext } from 'react';
import { loginPageStyle } from './LoginStyle';
import { palette } from '@material-ui/system';
import { useHistory } from "react-router-dom";
import Button from '@material-ui/core/Button';
import {Redirect} from 'react-router';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormItem from './components/formItem'
import signupLogo from '../images/signupImage.svg'
import { AuthContext } from '../context/AuthContext';


const useStyles = loginPageStyle

export default function Login() {
    

    let history = useHistory();
    const [user, setUser] = useState({
        mail: "",
        password: ""

    });
    
    const context = useContext(AuthContext);
    const { toggleAuth } = context; 

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
            email: user.mail,
            password: user.password,
        }
        console.log(data);
        const proxyurl = 'https://cors-anywhere.herokuapp.com/';
        const url = 'http://api.taskiton.wmdd.ca/user';
        fetch(proxyurl + url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }).then(function (response) {
            // console.log(response.status)
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            } 
            return response.json();
        }).then(function (result) {
            
            console.log(result);
            if(result.code === 204){
                alert(result.success);
            }else if (result.code === 200){
                localStorage.setItem("isAuth", true)
                toggleAuth(true);
                history.push("/dashboard");
            }
        }).catch(function (err) {
            console.log(err)
        });
    }

    function handleChange(event) {
        const { name, value } = event.target
        
        // //In progress
        // if(name === 'mail'){
        //     const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
        //      if(!validEmailRegex.test(value)){
        //         // console.log(FormItem().formIte)
        //         console.log('This is not email Adress');
        //      }
        // }
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
                        <Button  type='submit' className={classes.loginButton} variant="contained" color="primary" on> LOGIN </Button>
                    </form>
                </Grid>
            </Grid>
        </div>
    );
}