const express = require('express');
const router = express.Router();

const {
  createJobApplication,
  getAllJobApplications,
  getJobApplicationById,
  updateJobApplication,
  deleteJobApplication,
} = require('../controllers/JobApplicationController');

const authMiddleware = require('../middlewares/AuthMiddleware');

router.post('/jobApplications', authMiddleware, createJobApplication);
router.get('/jobApplications', getAllJobApplications);
router.get('/jobApplications/:id', getJobApplicationById);
router.put('/jobApplications/:id', authMiddleware, updateJobApplication);
router.delete('/jobApplications/:id', authMiddleware, deleteJobApplication);

module.exports = router;
