const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
    },
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
    },
    message: {
        type: String,
        required: true,
        trim: true,
    },
    time: {
        type: Date,
        default: Date.now,
    },
    unread: {
        type: Boolean,
        default: true,
    },
    senderIsCompany: {
        type: Boolean,
    },
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
