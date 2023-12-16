const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/AuthMiddleware');

const{
    getMessage, 
    sendMessage,
    getAllUsers
} = require('../controllers/MessageController');

router.post('/send-message', authMiddleware, sendMessage);
router.get('/get-message', authMiddleware, getMessage);
router.get('/get-all-users', authMiddleware,  getAllUsers)

module.exports = router;