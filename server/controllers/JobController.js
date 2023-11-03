const Job = require('../models/JobModel');

// Create a new job
exports.createJob = async (req, res) => {
    try {
        const {
            title,
            categories,
            level,
            requiredSkills,
            maxPositions,
            yearsOfExp,
            description,
            workingTime,
            offerSalary,
            startDate,
            endDate,
            companyID,
        } = req.body;

        const job = new Job({
            title,
            categories,
            level,
            requiredSkills,
            maxPositions,
            yearsOfExp,
            description,
            workingTime,
            offerSalary,
            startDate,
            endDate,
            companyID,
        });

        const savedJob = await job.save();

        res.status(201).json(savedJob);
    } catch (err) {
        res.status(500).json({ message: 'Internal server error', error: err });
    }
};

// Get all jobs
exports.getAllJobs = async (req, res) => {
    try {
        const jobs = await Job.find({}).populate('companyID', 'name'); // Populate company data

        res.status(200).json(jobs);
    } catch (err) {
        res.status(500).json({ message: 'Internal server error', error: err });
    }
};

// Get a job by ID
exports.getJobById = async (req, res) => {
    const jobId = req.params.id;

    try {
        const job = await Job.findById(jobId).populate('companyID', 'name'); // Populate company data

        if (!job) {
            return res.status(404).json({ message: 'Job not found.' });
        }

        res.status(200).json(job);
    } catch (err) {
        res.status(500).json({ message: 'Internal server error', error: err });
    }
};

// Update a job by ID
exports.updateJob = async (req, res) => {
    const jobId = req.params.id;
    const {
        title,
        categories,
        level,
        requiredSkills,
        maxPositions,
        yearsOfExp,
        description,
        workingTime,
        offerSalary,
        startDate,
        endDate,
    } = req.body;

    try {
        const updatedJob = await Job.findByIdAndUpdate(
            jobId,
            {
                title,
                categories,
                level,
                requiredSkills,
                maxPositions,
                yearsOfExp,
                description,
                workingTime,
                offerSalary,
                startDate,
                endDate,
            },
            { new: true }
        );

        if (!updatedJob) {
            return res.status(404).json({ message: 'Job not found.' });
        }

        res.status(200).json(updatedJob);
    } catch (err) {
        res.status(500).json({ message: 'Internal server error', error: err });
    }
};

// Delete a job by ID
exports.deleteJob = async (req, res) => {
    const jobId = req.params.id;

    try {
        const deletedJob = await Job.findByIdAndDelete(jobId);

        if (!deletedJob) {
            return res.status(404).json({ message: 'Job not found.' });
        }

        res.status(200).json({ message: 'Job deleted successfully.' });
    } catch (err) {
        res.status(500).json({ message: 'Internal server error', error: err });
    }
};
