import React from 'react';
import './contact.css';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
        width: theme.spacing(16),
        height: theme.spacing(16),
      },
    },
  }));

const Contact = () => {
    const classes = useStyles();

    return (
        <div>
            <Paper variant="outlined" square className='formContainer'>
            <form onSubmit={()=>{alert("Thank you for the message, we will get back to you soon!")}}>
                <label for="fname"><b>Name</b></label>
                <input className="contactInput" type="text" id="fname" name="firstname" placeholder="Your name.." required/>
                <label for="email"><b>Email</b></label>
                <input className="contactInput" type="email" id="email" name="email" placeholder="Your email.." required/>
                <label for="msg"><b>Message</b></label>
                <input className="contactInput" type="text" id="msg" name="msg" placeholder="Your message.." required style={{height:150}}/>
                <input className="contactSubmit" type="submit" value="Contact Us"
                />
            </form>
            </Paper>
        </div>
    );
}
 
export default Contact;
