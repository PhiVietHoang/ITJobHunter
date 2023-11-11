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

// Filter and paginate jobs
exports.filterAndPaginateJobs = async (req, res) => {
    try {
        const {
            title,
            categories,
            level,
            requiredSkills,
            minYearsOfExp,
            maxYearsOfExp,
            minSalary,
            maxSalary,
            page = 1,
            pageSize = 10,
        } = req.body;

        // Build the filter object based on the provided criteria
        const filter = {};

        if (title) {
            filter.title = { $regex: new RegExp(title, 'i') };
        }

        if (categories && categories.length > 0) {
            filter.categories = { $in: categories };
        }

        if (level) {
            filter.level = level;
        }

        if (requiredSkills && requiredSkills.length > 0) {
            filter.requiredSkills = { $all: requiredSkills };
        }

        if (minYearsOfExp || maxYearsOfExp) {
            filter.yearsOfExp = {};
            if (minYearsOfExp) {
                filter.yearsOfExp.$gte = minYearsOfExp;
            }
            if (maxYearsOfExp) {
                filter.yearsOfExp.$lte = maxYearsOfExp;
            }
        }

        if (minSalary || maxSalary) {
            filter.offerSalary = {};
            if (minSalary) {
                filter.offerSalary.$gte = minSalary;
            }
            if (maxSalary) {
                filter.offerSalary.$lte = maxSalary;
            }
        }

        // Paginate using skip and limit
        const skip = (page - 1) * pageSize;
        const jobs = await Job.find(filter)
            .populate('companyID', 'name')
            .skip(skip)
            .limit(pageSize);

        res.status(200).json(jobs);
    } catch (err) {
        res.status(500).json({ message: 'Internal server error', error: err });
    }
}