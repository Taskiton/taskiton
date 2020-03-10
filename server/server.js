const express = require('express');
var cors = require('cors')
const http = require('http');
const faker = require('faker');
const User = require("./model/user.model")
const connection = require ('./config/db.connection')

const dbConnection = connection();
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cors())
app.use(express.static('./public'))




/////////////////////////////////////////
//Create faker data and save in datasbase.
/////////////////////////////////////////
app.post('/user_create_faker', (req,res) => {
  
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Headers: Content-Type');
    console.log("Trruying to create a user");

    dbConnection.query(`INSERT INTO users (email, firstname, lastname, pw, confirm_pw) 
    VALUES ("${faker.internet.email()}","${faker.name.firstName()}", "${faker.name.lastName()}", "${faker.internet.password()}", "${faker.internet.password()}")`
    ,(err, results, fields) => {
        if(err){
            console.log("Failed" + err);
            res.sendStatus(500)
            return
        }
        console.log(`Inserted a new user with id : ${results.insertId}`)
        res.end();
    })

})



app.post('/user_create', (req,res) => {
  
    res.header('Access-Control-Allow-Origin', 'http://api.taskiton.wmdd.ca');
    res.header('Access-Control-Allow-Headers: Content-Type');
    console.log("Trruying to create a user");
    // const firstName = req.body.name;
    // const lastName = req.body.name;

    dbConnection.query(`INSERT INTO users (email, firstname, lastname, pw, confirm_pw) 
    VALUES ("${req.body.mail}","${req.body.name}", "${req.body.lastname}", "${req.body.password}", "${req.body.copassword}")`
    ,(err, results, fields) => {
        if(err){
            console.log("Failed" + err);
            res.sendStatus(500)
            return
        }
        console.log(`Inserted a new user with id : ${results.insertId}`)
        res.end();
    })

})

app.get('/user/:id', (req,res) => {
    console.log("Fetching user with" + req.params.id);
    dbConnection.query(`SELECT * FROM users WHERE user_id=${req.params.id}` , (err, rows, fieds) => {
    if(err){
        console.log("Failed" + err);
        res.end()
        return
    }
    console.log("Success!")
    res.json(rows)
    
    })
})

app.get("/users", (req,res) =>{
   
    dbConnection.query(`SELECT * FROM users` , (err, rows, fieds) => {
        if(err){
            console.log("Failed" + err);
            res.end()
            return
        }
        console.log("Success!")
        res.json(rows)
    })
})

app.get("/", (req,res) =>{
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Headers', "*");
    var user1 = new User();
    res.json(user1)
})

app.get('/dashboard',(req,res) => {
    console.log('Dashbiard!');
})



app.listen(3305, () =>{
    console.log("Server is up and Listening on 3003...");
})