const Message = require('../models/MessagesModel');
const Company = require('../models/CompanyModel');
const Employee = require('../models/EmployeeModel');
const userFromToken = require('../utils/UserFromToken');

exports.sendMessage = async (req, res) => {
    try {
        const userData = userFromToken(req);
        const { employeeId, companyId, message, senderIsCompany } = req.body;
        const employee = await Employee.findById(employeeId);
        const company = await Company.findById(companyId);

        if (!employee) {
            return res.status(404).json({ message: 'Employee not found.' });
        }

        if (!company) {
            return res.status(404).json({ message: 'Company not found.' });
        }

        const newMessage = new Message({ employeeId: employeeId, companyId: companyId, message: message, senderIsCompany: senderIsCompany});
        await newMessage.save();
        return res.status(200).json({ success: true, message: 'Message sent successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Internal server error', error: err });
    }
}

exports.getMessage = async (req, res) => {
    try {
        const { companyId, employeeId } = req.query;
        if (!companyId || !employeeId) return res.status(400).json({ error: err, message: 'employeeId and companyId are required' })

        const getMessage = await Message.find({
            $and: [{ companyId: companyId }, { employeeId: employeeId }]
        })
        return res.status(200).json({ data: getMessage, success: true });
    } catch (err) {
        res.status(500).json({ message: 'Internal server error', error: err })
    }
}

exports.getAllUsers = async (req, res) => {
    const id = req.query.id;
    if (id === 'undefined' || !id) return res.status(400).json({ success: false, message: 'id is required' })
    try {
        const getUsers = await Company.find({ _id: { $ne: id } });
        return res.status(200).json({ data: getUsers, success: true });
    } catch (err) {
        res.status(500).json({ message: 'Internal server error', error: err })
    }
}

exports.getCompanyAllUsers = async (req, res) => {
    const id = req.query.id;
    if (id === 'undefined' || !id) return res.status(400).json({ success: false, message: 'id is required' })
    try {
        const getUsers = await Employee.find({ _id: { $ne: id } });
        return res.status(200).json({ data: getUsers, success: true });
    } catch (err) {
        res.status(500).json({ message: 'Internal server error', error: err })
    }
}
