import React, { useState, useContext } from 'react';
import { signupPageStyle } from './SignupStyle';
import { palette } from '@material-ui/system';
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormItem from './components/formItem'
import signupLogo from '../images/signupImage.svg'
import { AuthContext } from '../context/AuthContext';


const useStyles = signupPageStyle

export default function Signup() {

    let history = useHistory();
    const [user, setUser] = useState({
        mail: "",
        name: "",
        lastname: "",
        password: "",
        copassword: ""
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
        if(user.password!==user.copassword) {
            alert("Password does not match!");
            return;
        }
        event.preventDefault()
        var data = {
            mail: user.mail,
            name: user.name,
            lastname: user.lastname,
            password: user.password,
            copassword: user.copassword,
        }
        // console.log(data);
        const proxyurl = 'https://cors-anywhere.herokuapp.com/';
        const url = 'http://api.taskiton.wmdd.ca/user_create';
        fetch(proxyurl + url, {
            method: 'POST',
            headers: { 'Accept': 'application/json, text/plain, */*'
            ,'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }).then(function (response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            // console.log(response)
            // return response.json();
        }).then(function (data) {
            //console.log(user.mail);
            localStorage.setItem("isAuth", true)
            localStorage.setItem("username","John Doe");
            toggleAuth(true);
            history.push("/dashboard");        
            fetchUsename(user.mail);
            if (data == "success") {
                console.log("Success");
            }
        }).catch(function (err) {
            console.log(err);
            alert("Error! Email may already exist in our record!");
        });
    }

    function fetchUsename(email) {
        console.log(email)
        let url = "http://api.taskiton.wmdd.ca/user/"+email;
        fetch(url, {
            method: 'GET',
            headers: { 'Accept': 'application/json, text/plain, */*'
            ,'Content-Type': 'application/json' }
        }).then(response => {
            console.log(response);
            if (response.status >= 400) {
                alert("Error - Fetching your username");
            }
            return response.json();
        })
        .then(data => {
            if(data[0]) {
                localStorage.setItem("username", data[0].firstname+" "+data[0].lastname);
            }
        }).catch(function (err) {
            alert("Error - Fetching your username");
            console.log(err)
        });
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
    const handleLogin = () => {
        history.push("/login");
    }

    return (
        <div className={classes.formStyle}>
            <Grid container>
                <Grid item xs={12} sm={6}>
                    {/* Image Ref: https://www.vecteezy.com/vector-art/634286-online-store-landing-page-template-with-isometric-illustration */}
                    <img className={classes.signupImage} src={signupLogo}></img>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <form onSubmit={(event) => handleSubmit(event)} style={frmStyle}  autoComplete="off">
                        <h1 style={{ textAlign: 'center', fontSize: '2.1em', marginTop: '0', color: 'black' }}>Create Account</h1>
                        <FormItem style={{ marginTop: '1vh' }} label="Email" name='mail' type="email" value={user.mail} onChange={(event) => handleChange(event)} />
                        <FormItem label="First Name" name='name' value={user.name} onChange={(event) => handleChange(event)} />
                        <FormItem label="Last Name" name='lastname' value={user.lastname} onChange={(event) => handleChange(event)} />
                        <FormItem type='password' label="Password" name='password' value={user.password} onChange={(event) => handleChange(event)} />
                        <FormItem type='password' label="Confirm Password" name='copassword' value={user.copassword} onChange={(event) => handleChange(event)} />
                        <Button id="submitButton" type="submit" className={classes.signUpButton} variant="contained" color="primary"> SIGN UP </Button>
                        {/* <input type="submit" value="Submit" /> */}
                        <Button id="loginButton" className={classes.loginButton} onClick={handleLogin} variant="contained" color="primary"> LOGIN </Button>
                    </form>
                </Grid>
            </Grid>
        </div>
    );
}