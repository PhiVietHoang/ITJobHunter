const express = require('express');
const router = express.Router();

const {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob,
  findJobByCompanyId,
  filterAndPaginateJobs,
  filterAndPaginateJobsByCompany,
} = require('../controllers/JobController');

const authMiddleware = require('../middlewares/AuthMiddleware');

router.post('/jobs', authMiddleware, createJob); // Create a new job
router.get('/jobs', getAllJobs); // Get all jobs
router.get('/jobs/:id', getJobById); // Get a job by ID
router.put('/jobs/:id', authMiddleware, updateJob); // Update a job by ID
router.delete('/jobs/:id', authMiddleware, deleteJob); // Delete a job by ID
router.post('/jobs/filtered-jobs', filterAndPaginateJobs); //search job
router.get('/jobsByCompany', findJobByCompanyId); // Find job by companyId
router.post('/jobs/filtered-jobs-by-company', filterAndPaginateJobsByCompany); //search job

module.exports = router;
