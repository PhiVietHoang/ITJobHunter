const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
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
    phoneNumber: {
        type: String,
        trim: true,
    },
    companyName: {
        type: String,
        required: true,
        trim: true,
    },
    companyEmails: {
        type: [String],
        default: [],
    },
    companyWebsites: {
        type: [String],
        default: [],
    },
    companyPhoneNumbers: {
        type: [String],
        default: [],
    },
    companyLocations: {
        type: [String],
        default: [],
    },
    companyLogo: {
        type: String,
    },
    description: {
        type: String,
        trim: true,
    },
});

const Company = mongoose.model('Company', companySchema);

module.exports = Company;
