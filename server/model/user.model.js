const faker = require('faker');

class Users {
    constructor(){
        this.username = faker.internet.userName();
        this.firstName = faker.name.firstName();
        this.lastName = faker.name.lastName();
    }
}

module.exports = Users;