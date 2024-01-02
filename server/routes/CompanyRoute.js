const express = require('express');
const router = express.Router();

const {
  register,
  login,
  logout,
  getAllCompanies,
  getCompanyById,
  updateCompany,
  deleteCompany,
  getProfile,
  filterAndPaginateCompany,
  getCompanyInsight
} = require('../controllers/CompanyController');

const authMiddleware = require('../middlewares/AuthMiddleware');

router.post('/register', register);
router.post('/login', login);
router.post('/logout', authMiddleware, logout);
router.get('/companies', getAllCompanies);
router.get('/companies/:id', getCompanyById);
router.put('/companies/:id', authMiddleware, updateCompany);
router.delete('/companies/:id', authMiddleware, deleteCompany);
router.get('/profile',authMiddleware, getProfile);
router.post('/filter-companies', filterAndPaginateCompany);
router.get('/insight/:id',authMiddleware, getCompanyInsight);

module.exports = router;
