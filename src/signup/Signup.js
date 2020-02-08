import React, { useState, useEffect } from 'react';
import { signupPageStyle } from './SignupStyle';
import { palette } from '@material-ui/system';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormItem from './components/formItem'
import signupLogo from '../images/signupImage.svg'

const useStyles = signupPageStyle

export default function Signup() {

    const [user, setUser] = useState({
        mail: "",
        name: "",
        lastname: "",
        password: "",
        copassword: ""
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
            name: user.name,
            lastname: user.lastname,
            mail: user.mail,
            password: user.password,
            copassword: user.copassword,
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
        setUser(prevState => {
            console.log(prevState)
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
                        <h1 style={{ textAlign: 'center', fontSize: '2.1em', marginTop: '0', color: 'black' }}>Create Account</h1>
                        <FormItem style={{ marginTop: '1vh' }} label="Email" name='mail' value={user.mail} onChange={(event) => handleChange(event)} />
                        <FormItem label="First Name" name='name' value={user.name} onChange={(event) => handleChange(event)} />
                        <FormItem label="Last Name" name='lastname' value={user.lastname} onChange={(event) => handleChange(event)} />
                        <FormItem label="Password" name='password' value={user.password} onChange={(event) => handleChange(event)} />
                        <FormItem label="Confirm Password" name='copassword' value={user.copassword} onChange={(event) => handleChange(event)} />
                        <Button type="submit" className={classes.signUpButton} variant="contained" color="primary"> SIGN UP </Button>
                        <Button  className={classes.loginButton} variant="contained" color="primary"> LOGIN </Button>
                    </form>
                </Grid>
            </Grid>
        </div>
    );
}