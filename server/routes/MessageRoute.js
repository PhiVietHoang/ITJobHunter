const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/AuthMiddleware');

const{
    getMessage, 
    sendMessage,
    getAllUsers,
    getCompanyAllUsers
} = require('../controllers/MessageController');

router.post('/send-message', authMiddleware, sendMessage);
router.get('/get-message', authMiddleware, getMessage);
router.get('/get-all-users', authMiddleware,  getAllUsers)
router.get('/get-company-all-users', authMiddleware,  getCompanyAllUsers)

module.exports = router;