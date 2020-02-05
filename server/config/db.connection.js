const mysql = require('mysql');
const dbconfig = require ('./db.config')

module.exports = () => {

    //DB Connection
    return mysql.createConnection({
    host: dbconfig.HOST,
    user: dbconfig.USER,
    password: dbconfig.PASSWORD,
    database: dbconfig.DB

    })
}