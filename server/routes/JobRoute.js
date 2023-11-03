const express = require('express');
const router = express.Router();

const {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob,
} = require('../controllers/JobController');

const authMiddleware = require('../middlewares/AuthMiddleware');

router.post('/jobs', authMiddleware, createJob); // Create a new job
router.get('/jobs', getAllJobs); // Get all jobs
router.get('/jobs/:id', getJobById); // Get a job by ID
router.put('/jobs/:id', authMiddleware, updateJob); // Update a job by ID
router.delete('/jobs/:id', authMiddleware, deleteJob); // Delete a job by ID

module.exports = router;
