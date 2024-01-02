const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Employee',
    },
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Company',
    },
    message: {
        type: String,
        required: [true, "Please send a message"],
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
        default: false,
    },
},{"timestamp": true});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
