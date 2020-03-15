import React, { useState, useEffect} from 'react';
import './Chat.css';
import UserData from "./userData"
import { makeStyles } from '@material-ui/core/styles';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange, deepPurple } from '@material-ui/core/colors';
import useInput from './InputControl';
import PubNub from 'pubnub';
import ApiConfig from '../../config/config'
import {Card,Chip, Divider, CardActions, CardContent,List, ListItem,Button,Typography,Input} from '@material-ui/core';



const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[100]),
    backgroundColor: deepPurple[500],

  },
  chatAvatar: {
    backgroundColor: '#e6e6e6',
    height: '7vh',
    overflow:'auto',
    marginLeft: '3vw',
    borderRadius: '10px',
    boxShadow:'5px 5px 21px -15px rgba(64,56,64,0.69)'
    
  },
  messageContainer:{
    position:'relative',
    top:'4vh'
  },
  chatInfoContainer:{
    position:'relative',
    top:'3vh'
  },
  date:{
    fontSize:'10px',
    color:'#A9A9A9',
    marginLeft:'1vw'
  },
  chatUsername:{
    fontWeight:'420',
    marginLeft:'3vw'

  },
  mainMessage:{
    
     marginTop:'2vh'
  },
  avatar: {
    position: 'absolute',
    marginTop:'3vh',
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: '#F76C6C',
    width: theme.spacing(4),
    height: theme.spacing(4),
  
}
}));

// Our main Component, the parent to all the others, the one to rule them all.
function App() {
  const classes = useStyles();
  //Set a default channel incase someone navigates to the base url without
  //specificfying a channel name parameter.
  let defaultChannel = "Global";
 
 
  const [channel,setChannel] = useState(defaultChannel);
  const [messages,setMessages] = useState([]);
  // const [username] = useState([UserData.users[0].displayname,Math.floor(Math.random() * 10)].join('-'));
  const [username] = useState(UserData.users[1].displayname);
  // const tempChannel = useInput();
  const tempMessage = useInput();

  function getUserListFromAPI(){

        const proxyurl = 'https://cors-anywhere.herokuapp.com/';
        const url = 'http://api.taskiton.wmdd.ca/users';
        fetch(url, {
            headers: { 'Content-Type': 'application/json' },

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
               
            }
        }).catch(function (err) {
            console.log(err)
        });
  }
  //This is where we set up PubNub and handle events that come through. 
  useEffect(()=>{
    getUserListFromAPI();
    console.log("setting up pubnub");
    const pubnub = new PubNub({
      publishKey: ApiConfig.PUBLISHKEY,
      subscribeKey: ApiConfig.SUBSCRIBEKEY,
      uuid: username
    });

    
    pubnub.addListener({
     status: function(statusEvent) {
       if (statusEvent.category === "PNConnectedCategory") {
         console.log("Connected to PubNub!")
       }
     },
     message: (msg) => {
       if(msg.message.text){
        const unixTimestamp = msg.timetoken / 10000000;
        const gmtDate = new Date(unixTimestamp * 1000);
        const localeDateTime = gmtDate.toLocaleString();
         console.log(msg.message.text+"----" + localeDateTime);
         let newMessages = [];
         newMessages.push({
           uuid:msg.message.uuid,
           text: msg.message.text,
           date: localeDateTime
         });
         setMessages(messages=>messages.concat(newMessages))
       }
     },
     presence: function(p) {
      // handle presence
      var timeout = p.timetoken
      var occupancy = p.occupancy; // No. of users connected with the channel
      var state = p.state; // User State
      var publishTime = p.timestamp; // Publish timetoken
      var timetoken = p.timeout;  // Current timetoken
      console.log(occupancy)
      }
    });

      pubnub.hereNow({
        channels: ['Global'],
        includeUUIDs: true,
        includeState: true,
      }, (status, response) => {
        //console.log(response);
      });

     //Subscribes to the channel in our state
     pubnub.subscribe({
         channels: [channel],
         withPresence: true
     });
     pubnub.history(
     {
         channel: channel,
         count: 10, // 100 is the default
         stringifiedTimeToken: true // false is the default
     }, function (status, response){
       
        let newMessages = [];
         for (let i  = 0; i < response.messages.length;i++){
          const unixTimestamp = response.messages[i].timetoken / 10000000;
          const gmtDate = new Date(unixTimestamp * 1000);
          const localeDateTime = gmtDate.toLocaleString();
           newMessages.push({
             uuid:response.messages[i].entry.uuid ,
             text: response.messages[i].entry.text,
             date: localeDateTime
           });
           //console.log(response.messages)
         }
         setMessages(messages=>messages.concat(newMessages));
       }
     );
    return function cleanup(){
      console.log("shutting down pubnub");
      pubnub.unsubscribeAll();
      setMessages([]);
    }
  },[channel, username]);
  

  function handleKeyDown(event){
    if(event.target.id === "messageInput"){
      if (event.key === 'Enter') {
        publishMessage();
      }
    }
    // else if(event.target.id === "channelInput"){
    //   if (event.key === 'Enter') {
    //     //Navigates to new channels
    //     const newChannel = tempChannel.value.trim();
    //     if(newChannel){
    //       if(channel !== newChannel){
    //         //If the user isnt trying to navigate to the same channel theyre on
    //         setChannel(newChannel);
    //         let newURL = window.location.origin + "?channel=" + newChannel;
    //         window.history.pushState(null, '',newURL);
    //         tempChannel.setValue('');
    //       }
    //     }else{
    //       //If the user didnt put anything into the channel Input
    //       if(channel !== "Global"){
    //         //If the user isnt trying to navigate to the same channel theyre on
    //         setChannel("Global");
    //         let newURL = window.location.origin;
    //         window.history.pushState(null, '',newURL);
    //         tempChannel.setValue('');
    //       }
    //     }
    //   }
    // }

  }

  //Publishing messages via PubNub
  function publishMessage(){
   if (tempMessage.value) {
     let messageObject = {
       text: tempMessage.value,
       uuid: username
     };

     const pubnub = new PubNub({
        publishKey: "pub-c-10978436-24d2-4d1f-aadf-e88df92715b3",
        subscribeKey: "sub-c-1ae870c6-5741-11ea-814d-0ecb550e9de2",
        uuid: username
      });
     pubnub.publish({
       message: messageObject,
       channel: channel
     });
     tempMessage.setValue('');
   }
 }
 
    return(
      <Card>
          <CardContent>
            <div className="top">
              <Typography variant="h5" inline >
                Group Chat
                </Typography>
            </div>
            <div >
              
              <Log messages={messages}/>
            </div>
          </CardContent>
          <CardActions>
            <Input
              placeholder="Enter a message"
              fullWidth={true}
              id="messageInput"
              value={tempMessage.value}
              onChange={tempMessage.onChange}
              onKeyDown={handleKeyDown}
              inputProps={{'aria-label': 'Message Field',}}
              autoFocus={true}
            />
            <Button
              size="small"
              color="primary"
              onClick={publishMessage}
              >
              Submit
            </Button>
          </CardActions>
        </Card>
      );
}

//Log functional component that is the list of messages
function Log(props) {

  return(
    <List style={{maxHeight:'50vh', overflow:'auto'}} component="nav">
      <ListItem>
      <Typography component="div">
        { props.messages.map((item, index)=>(
          <Message key={index} uuid={item.uuid} text={item.text} date={item.date}/>
        )) }
      </Typography>
      </ListItem>
    </List>
  )
};

//Our message functional component that formats each message.
function Message(props){
  const classes = useStyles();
  let userName = props.uuid;
  let message = props.text;
  let breakMessage = message.replace(/(.{5})/g, "$1<br>");
  //console.log(document.getElementById('chip'))
  // console.log(breakMessage)
  let boldUsername = userName;

  var messageIndividual = `${boldUsername} - ${props.text}`
  return (
    <div>
      <ListItemText className={classes.mainMessage}>  
      
      <Avatar className={classes.avatar}>YT</Avatar>
      <div className={classes.chatInfoContainer}>
      <span className={classes.chatUsername}>{props.uuid}</span>
      <span className={classes.date}>{props.date}</span>
      </div>
     
      <div className={classes.messageContainer}>
      <Chip id="chip" className={classes.chatAvatar} label={breakMessage} />
      </div>
      </ListItemText>
    
    </div>
  );
}

export default App;