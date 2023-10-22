const mongoose = require('mongoose');

const jobApplicationSchema = new mongoose.Schema({
    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee', 
    },
    jobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
    },
    applicationDate: {
        type: Date,
        default: Date.now,
    },
    cv: {
        type: Buffer,
    },
    status: {
        type: String,
        trim: true,
    },
});

const JobApplication = mongoose.model('JobApplication', jobApplicationSchema);

module.exports = JobApplication;
