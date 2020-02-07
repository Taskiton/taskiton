const express = require('express');
var cors = require('cors')
const User = require("./model/user.model")
const connection = require ('./config/db.connection')

const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cors())
app.use(express.static('./public'))

const dbConnection = connection();

app.post('/user_create', (req,res) => {
  
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Headers: Content-Type');
    console.log("Trruying to create a user");
    // const firstName = req.body.name;
    // const lastName = req.body.name;
    
    

    dbConnection.query(`INSERT INTO taskiton (email,firstname, lastname, password, confirmpassword) 
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
    dbConnection.query(`SELECT * FROM taskiton WHERE user_id=${req.params.id}` , (err, rows, fieds) => {
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
   
    dbConnection.query(`SELECT * FROM taskiton` , (err, rows, fieds) => {
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
    var user1 = new User ("yalcinos", "Yalcin", "Tatar");
    res.json(user1)
})

app.listen(3003, () =>{
    console.log("Server is up and Listening on 3003...");
})