const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/AuthMiddleware');

const{
    getMessage, 
    sendMessage
} = require('../controllers/MessageController');

router.post('/send-message', authMiddleware, sendMessage);
router.get('/get-message', authMiddleware, getMessage);

module.exports = router;