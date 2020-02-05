const express = require("express");

class Users {
    constructor(username,firstName,lastName){
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
    }
}

module.exports = Users;