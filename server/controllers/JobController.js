const { default: mongoose } = require('mongoose');
const Job = require('../models/JobModel');
const Company = require('../models/CompanyModel');
const JobApplication = require('../models/JobApplicationModel')

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
        const jobs = await Job.find({}).populate('jobApplicationCount').populate('companyID', 'companyName'); // Populate company data

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
        const job = await Job.findById(jobId);

        if (!job) {
            console.log('error here');
            return res.status(404).json({ message: 'Job no info '});
        }

        const deletedJobApplication = await JobApplication.deleteMany({ jobId : job._id });

        if (!deletedJobApplication) {
            console.log('error here 2');
            return res.status(404).json({ message: 'Job application not found '});
        }

        const deletedJob = await Job.findByIdAndDelete(jobId);

        if (!deletedJob) {
            return res.status(404).json({ message: 'Job not found.' });
        }

        res.status(200).json({ message: 'Job deleted successfully.' });
    } catch (err) {
        res.status(500).json({ message: 'Internal server error', error: err });
    }
};

// Select jobs by companyId
exports.findJobByCompanyId = async (req, res) => {
    const { companyID } = req.query;

    try {
        const jobs = await Job.find( {companyID} ).populate('jobApplicationCount').populate({
            path: 'companyID',
            select: '_id companyName companyLogo companyLocations',
        });

        return res.status(200).json(jobs);
    } catch (err) {
        return res.status(500).json({ message: 'Internal server error', error: err})
    }
}

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
            companyName,
            workingTime,
            location,
            page = 0,
            pageSize = 10,
        } = req.body;

        //Check pagesize from front end
        const requestedPageSize = req.body.pageSize ? req.body.pageSize : pageSize;
        
        // Build the filter object based on the provided criteria
        const filter = {};

        if (title) {
            filter.title = { $regex: new RegExp(title, 'i') };
        }

        if (categories && categories.length > 0) {
            filter.categories = { $regex: new RegExp(categories, 'i') };
        }
        
        if (level) {
            filter.level = { $regex: new RegExp(level, 'i') };
        }

        if (workingTime) {
            filter.workingTime = { $regex: new RegExp(workingTime, 'i') };
        }

        if (requiredSkills && requiredSkills.length > 0) {
            filter.requiredSkills = { $regex: new RegExp(requiredSkills, 'i') };
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

        if (companyName || location) {
            const companyFilter = {};
            if (companyName) {
                companyFilter.companyName = { $regex: new RegExp(companyName, 'i') };
            }
            if (location) {
                companyFilter.companyLocations = { $regex: new RegExp(location, 'i') };
            }

            const companies = await Company.find(companyFilter).select('_id');
            const companyIds = companies.map(company => company._id);
            if (companyIds.length > 0) {
                filter.companyID = { $in: companyIds };
            }
        }

        // Paginate using skip and limit
        const skip = page * requestedPageSize;
        const jobs = await Job.find(filter).populate('jobApplicationCount')
            .populate({
                path: 'companyID',
                select: '_id companyName companyLogo companyLocations',
            })
            .skip(skip)
            .limit(requestedPageSize);

        const totalJobs = await Job.countDocuments(filter);
        const totalPages = Math.ceil(totalJobs / requestedPageSize);

        res.status(200).json({jobs, totalPages});
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error', error: err });
    }
}

exports.filterAndPaginateJobsByCompany = async (req, res) => {
    try {
        const {
            title,
            companyID,
            page = 0,
            pageSize = 5,
        } = req.body;

        //Check pagesize from front end
        const requestedPageSize = req.body.pageSize ? req.body.pageSize : pageSize;
        
        // Build the filter object based on the provided criteria
        const filter = {};

        filter.companyID = companyID;

        if (title) {
            filter.title = { $regex: new RegExp(title, 'i') };
        }

        // Paginate using skip and limit
        const skip = page * requestedPageSize;
        const jobs = await Job.find(filter).populate('jobApplicationCount')
            .populate({
                path: 'companyID',
                select: '_id companyName companyLogo companyLocations',
            })
            .skip(skip)
            .limit(requestedPageSize);

        const totalJobs = await Job.countDocuments(filter);
        const totalPages = Math.ceil(totalJobs / requestedPageSize);
        res.status(200).json({jobs, totalPages});
    } catch (err) {
        res.status(500).json({ message: 'Internal server error', error: err });
    }
}