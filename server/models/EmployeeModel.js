const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    phoneNumber: {
        type: String,
        trim: true,
    },
    dob: {
        type: Date,
    },
    joinDate: {
        type: Date,
    },
    avatar: {
        type: Buffer,
    },
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
