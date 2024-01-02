const JobApplication = require('../models/JobApplicationModel');
const Employee = require('../models/EmployeeModel');
const Company = require('../models/CompanyModel');
const Job = require('../models/JobModel');
const multer = require('multer');
const fs = require('fs');
const upload = multer({ dest: 'uploads/' });
const stream = require('stream');

exports.upload = upload.single('cv');
// Create a new job application
exports.createJobApplication = async (req, res) => {
    try {
        const { jobId, employeeId, status } = req.body;
        const cvFile = req.file; // File tải lên từ multer

        // Kiểm tra xem file có tồn tại trong request không
        if (!cvFile) {
            return res.status(400).send({ message: "Please upload a CV." });
        }

        // Đọc nội dung file (lưu ý: chỉ nên làm với file nhỏ)
        const cvData = fs.readFileSync(cvFile.path);
        const cvContentType = cvFile.mimetype;

        // Tạo job application mới
        const jobApplication = new JobApplication({
            employeeId,
            jobId,
            cv: { data: cvData, contentType: cvContentType },
            status,
        });

        // Lưu job application vào MongoDB
        const savedJobApplication = await jobApplication.save();

        // Xóa file tạm sau khi lưu vào cơ sở dữ liệu
        fs.unlinkSync(cvFile.path);

        // Trả về response thành công
        res.status(201).json(savedJobApplication);
    } catch (err) {
        // Xóa file tạm nếu có lỗi xảy ra
        if (req.file) fs.unlinkSync(req.file.path);

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
    const { status } = req.body;

    try {
        const updatedJobApplication = await JobApplication.findByIdAndUpdate(
            jobApplicationId,
            { status },
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

// Get job applications by employee id
exports.getJobApplicationByJobId = async (req, res) => {
    const jobId = req.params.jobId;
    try {
        const jobApplications = await JobApplication.countDocuments({jobId});
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

exports.getFilterJobApplicationByEmployeeId = async (req, res) => {
    const employeeId = req.params.employeeId;
    const { jobTitle, page = 0, pageSize = 10 } = req.body; // Thêm page và pageSize

    try {
        let filter = { employeeId };

        if (jobTitle) {
            const jobIds = await Job.find({ title: { $regex: new RegExp(jobTitle, 'i') } }).select('_id');
            filter.jobId = { $in: jobIds.map(job => job._id) };
        }

        const skip = page * pageSize;
        const jobApplications = await JobApplication.find(filter)
            .populate('jobId')
            .skip(skip)
            .limit(pageSize);

        const totalApplications = await JobApplication.countDocuments(filter);
        const totalPages = Math.ceil(totalApplications / pageSize);

        res.status(200).json({ jobApplications, totalApplications, totalPages });
    } catch (err) {
        res.status(500).json({ message: 'Internal server error', error: err });
    }
};



exports.getFilterJobApplicationsByCompanyId = async (req, res) => {
    const companyId = req.params.companyId;
    const { jobTitle, page = 0, pageSize = 5 } = req.body; // Thêm page và pageSize

    try {
        let jobQuery = { companyID: companyId };
        if (jobTitle) {
            Object.assign(jobQuery, { title: { $regex: new RegExp(jobTitle, 'i') } });
        }

        const jobIds = await Job.find(jobQuery).select('_id');
        const skip = page * pageSize;
        const jobApplications = await JobApplication.find({ jobId: { $in: jobIds } })
            .populate('employeeId', 'name email phoneNumber')
            .populate('jobId')
            .skip(skip)
            .limit(pageSize);

        const totalApplications = await JobApplication.countDocuments({ jobId: { $in: jobIds } });
        const totalPages = Math.ceil(totalApplications / pageSize);

        res.status(200).json({ jobApplications, totalApplications, totalPages });
    } catch (err) {
        res.status(500).json({ message: 'Internal server error', error: err });
    }
};

exports.getCV = async (req, res) => {
    try {
        const jobApplicationId = req.params.jobApplicationId;
        const jobApplication = await JobApplication.findById(jobApplicationId).populate('employeeId', 'name');

        if (!jobApplication || !jobApplication.cv || !jobApplication.cv.data) {
            return res.status(404).send({ message: "CV not found." });
        }

        if (!jobApplication.employeeId || !jobApplication.employeeId.name) {
            return res.status(404).send({ message: "Employee not found." });
        }

        // Infer the file extension from the contentType
        let fileExtension = '';
        switch (jobApplication.cv.contentType) {
            case 'application/pdf':
                fileExtension = '.pdf';
                break;
            case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
                fileExtension = '.docx';
                break;
            default:
                return res.status(400).send({ message: "Unsupported file type." });
        }

        const fileName = `${jobApplication.employeeId.name}-cv${fileExtension}`;
        // Set headers for file download
        res.setHeader('Content-Type', jobApplication.cv.contentType);
        res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
        // Convert the buffer to a readable stream and pipe it to the response
        const readStream = new stream.PassThrough();
        readStream.end(jobApplication.cv.data);
        readStream.pipe(res);
    } catch (error) {
        res.status(500).send({ message: "Could not download the CV.", error: error.toString() });
    }
};