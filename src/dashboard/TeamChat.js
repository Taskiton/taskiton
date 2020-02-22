import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Chip from '@material-ui/core/Chip';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';


const useStyles = makeStyles(theme => ({
       
    root:{
       margin: '20px',
       padding: theme.spacing(3,2)
        
    },
    flex:{
        display:'flex',
        alignItems: 'center'
    },
    topicsWindow:{
        width: '30%',
        height: '300px',
        borderRight: '1px solid grey'
    },
    chatWindow:{
        width: '70%',
        height: '300px',
        padding : '20px'
    },
    chatBox:{
        width: '85%',
    },
    button:{
        width: '16%'
    },
}));

export default function TeamChat() {
    const classes = useStyles();
    const [textValue, setTextValue] = useState('');

    return (
        <div>
            <Paper className={classes.root}>
                Hello Chat!
                <div className={classes.flex}>
                   <div className={classes.topicsWindow}>
                       <List>
                           {
                               ['topic'].map(topic => (
                                <ListItem key={topic} button>
                                    <ListItemText primary={topic} />
                                </ListItem>
                               
                               ))
                           }
                      
                       </List>
                   </div>
                   <div className={classes.chatWindow}>
                   
                           {
                               [{from: 'user', msg: 'hello'}].map((chat , i) => (
                                <div className={classes.flex} key={i}>
                                    <Chip label={chat.from} className={classes.chip}/> 
                                    <h4>{chat.msg}</h4> 
                                </div>
                               
                               ))
                           }
                    </div>
                </div>
                <div className={classes.flex}>
                <TextField id="standard-basic" 
                label="Send a message" 
                className={classes.chatBox}
                value={textValue}
                onChange={e => setTextValue(e.target.value)}
                 />
                <Button variant="contained" color="primary">
                    SEND
                </Button>
                </div>
            </Paper>
        </div>
    );

}