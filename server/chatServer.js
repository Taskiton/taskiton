const express = require('express');
const app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
    res.sendFile(__dirname + '/app.js');
  });
  
  io.on('connection', function(socket){
    socket.on('chat message', function(msg){
      io.emit('chat message', msg);
    });
  });
  
  http.listen(3005, function(){
    console.log('listening on *:3004');
  });