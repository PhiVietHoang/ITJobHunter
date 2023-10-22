const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    categories: {
        type: [String],
        default: [],
    },
    level: {
        type: String,
        trim: true,
    },
    requiredSkills: {
        type: [String],
        default: [],
    },
    maxPositions: {
        type: Number,
    },
    yearsOfExp: {
        type: String,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    workingTime: {
        type: String,
        trim: true,
    },
    offerSalary: {
        type: String,
        trim: true,
    },
    startDate: {
        type: Date,
    },
    endDate: {
        type: Date,
    },
    companyID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company', 
    },
});

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
