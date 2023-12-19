const JobApplication = require('../models/JobApplicationModel');
const Employee = require('../models/EmployeeModel');
const Company = require('../models/CompanyModel');
const Job = require('../models/JobModel');

// Create a new job application
exports.createJobApplication = async (req, res) => {
    try {
        const { employeeId, jobId, cv, status } = req.body;

        const employee = await Employee.findById(employeeId);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found.' });
        }

        const jobApplication = new JobApplication({
            employeeId,
            jobId,
            cv,
            status,
        });

        const savedJobApplication = await jobApplication.save();

        res.status(201).json(savedJobApplication);
    } catch (err) {
        res.status(500).json({ message: 'Internal server error', error: err });
    }
};

// Get all job applications
exports.getAllJobApplications = async (req, res) => {
    try {
        const jobApplications = await JobApplication.find({})
            .populate('employeeId', 'name email') // Populate employee data
            .populate('jobId', 'title');

        res.status(200).json(jobApplications);
    } catch (err) {
        res.status(500).json({ message: 'Internal server error', error: err });
    }
};

// Get a job application by ID
exports.getJobApplicationById = async (req, res) => {
    const jobApplicationId = req.params.id;

    try {
        const jobApplication = await JobApplication.findById(jobApplicationId)
            .populate('employeeId', 'name email') // Populate employee data
            .populate('jobId', 'title');

        if (!jobApplication) {
            return res.status(404).json({ message: 'Job application not found.' });
        }

        res.status(200).json(jobApplication);
    } catch (err) {
        res.status(500).json({ message: 'Internal server error', error: err });
    }
};

// Update a job application by ID
exports.updateJobApplication = async (req, res) => {
    const jobApplicationId = req.params.id;
    const { cv, status } = req.body;

    try {
        const updatedJobApplication = await JobApplication.findByIdAndUpdate(
            jobApplicationId,
            { cv, status },
            { new: true }
        );

        if (!updatedJobApplication) {
            return res.status(404).json({ message: 'Job application not found.' });
        }

        res.status(200).json(updatedJobApplication);
    } catch (err) {
        res.status(500).json({ message: 'Internal server error', error: err });
    }
};

// Delete a job application by ID
exports.deleteJobApplication = async (req, res) => {
    const jobApplicationId = req.params.id;

    try {
        const deletedJobApplication = await JobApplication.findByIdAndDelete(jobApplicationId);

        if (!deletedJobApplication) {
            return res.status(404).json({ message: 'Job application not found.' });
        }

        res.status(200).json({ message: 'Job application deleted successfully.' });
    } catch (err) {
        res.status(500).json({ message: 'Internal server error', error: err });
    }
};

// Get job applications by employee id
exports.getJobApplicationByEmployeeId = async (req, res) => {
    const employeeId = req.params.employeeId;

    try {
        const jobApplications = await JobApplication.find({ employeeId })
            .populate('jobId');

        res.status(200).json(jobApplications);
    } catch (err) {
        res.status(500).json({ message: 'Internal server error', error: err });
    }
};

// Get job applications by company ID
exports.getJobApplicationsByCompanyId = async (req, res) => {
    const companyId = req.params.companyId;

    try {
        const jobs = await Job.find({ companyID: companyId });
        const jobIds = jobs.map(job => job._id);
        const jobApplications = await JobApplication.find({ jobId: { $in: jobIds } })
            .populate('employeeId', 'name email phoneNumber')
            .populate('jobId');
        
        res.status(200).json(jobApplications);
    } catch (err) {
        res.status(500).json({ message: 'Internal server error', error: err });
    }
};