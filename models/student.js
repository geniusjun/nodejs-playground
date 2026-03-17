const Person = require('./person');

class Student extends Person {
    constructor({ id, name, age, major, email }) {
        super({ id, name, age });
        this.major = major;
        this.email = email;
    }
}

module.exports = Student;
