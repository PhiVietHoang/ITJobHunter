const express = require('express');
const router = express.Router();

const {
  createJobApplication,
  getAllJobApplications,
  getJobApplicationById,
  updateJobApplication,
  deleteJobApplication,
  getJobApplicationByEmployeeId,
  getJobApplicationsByCompanyId,
  getFilterJobApplicationByEmployeeId,
  getFilterJobApplicationsByCompanyId
} = require('../controllers/JobApplicationController');

const authMiddleware = require('../middlewares/AuthMiddleware');

router.post('/jobApplications', authMiddleware, createJobApplication);
router.get('/jobApplications', getAllJobApplications);
router.get('/jobApplications/:id', getJobApplicationById);
router.put('/jobApplications/:id', authMiddleware, updateJobApplication);
router.delete('/jobApplications/:id', authMiddleware, deleteJobApplication);
router.get('/jobApplications/employee/:employeeId', authMiddleware, getJobApplicationByEmployeeId);
router.get('/jobApplications/company/:companyId', authMiddleware, getJobApplicationsByCompanyId);
router.post('/jobApplications/employee/:employeeId', authMiddleware, getFilterJobApplicationByEmployeeId);
router.post('/jobApplications/company/:companyId', authMiddleware, getFilterJobApplicationsByCompanyId);

module.exports = router;
