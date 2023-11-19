const Employee = require('../models/EmployeeModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userFromToken = require('../utils/UserFromToken');

exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: 'Name, email, and password are required.',
            });
        }

        let employee = await Employee.findOne({ email });

        if (employee) {
            return res.status(400).json({
                message: 'Employee already registered.',
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        employee = await Employee.create({
            name,
            email,
            password: hashedPassword,
        });

        employee.password = undefined;

        res.status(200).json({
            employee,
        });
    } catch (err) {
        res.status(500).json({
            message: 'Internal server error',
            error: err,
        });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const employee = await Employee.findOne({ email });

        if (employee) {
            const validatedPassword = await bcrypt.compare(password, employee.password);
            if (validatedPassword) {
                const token = jwt.sign(
                    { email: employee.email, id: employee._id },
                    process.env.JWT_SECRET,
                    { expiresIn: process.env.JWT_EXPIRY }
                );

                employee.password = undefined;

                res.status(200).json({
                    employee,
                    token,
                });
            } else {
                res.status(401).json({
                    message: 'Email or password is incorrect.',
                });
            }
        } else {
            res.status(400).json({
                message: 'Employee not found.',
            });
        }
    } catch (err) {
        res.status(500).json({
            message: 'Internal server error',
            error: err,
        });
    }
};

exports.logout = async (req, res) => {
    res.cookie('token', '').json({
        message: 'Logged out successfully!',
    });
};

exports.getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.find({});

        employees.forEach((employee) => {
            employee.password = undefined;
        });

        res.status(200).json(employees);
    } catch (err) {
        res.status(500).json({
            message: 'Internal server error',
            error: err,
        });
    }
};

exports.getEmployeeById = async (req, res) => {
    const employeeId = req.params.id;

    try {
        const employee = await Employee.findById(employeeId);

        if (!employee) {
            return res.status(404).json({
                message: 'Employee not found.',
            });
        }

        employee.password = undefined;

        res.status(200).json(employee);
    } catch (err) {
        res.status(500).json({
            message: 'Internal server error',
            error: err,
        });
    }
};

exports.updateEmployee = async (req, res) => {
    const employeeId = req.params.id;
    const { name, email, phoneNumber, dob, joinDate, avatar, description, experience, address, gender, education, certificates, skill } = req.body;

    try {
        if (email) {
            const existingEmployee = await Employee.findOne({ email });
            if (existingEmployee && existingEmployee._id.toString() !== employeeId) {
                return res.status(400).json({
                    message: 'Email is already registered.',
                });
            }
        }

        const updatedEmployee = await Employee.findByIdAndUpdate(
            employeeId,
            {
                name,
                email,
                phoneNumber,
                dob,
                joinDate,
                avatar,
                description,
                experience,
                address,
                gender,
                education,
                certificates,
                skill
            },
            { new: true }
        );
        if (!updatedEmployee) {
            return res.status(404).json({
                message: 'Employee not found.',
            });
        }

        updatedEmployee.password = undefined;

        res.status(200).json(updatedEmployee);
    } catch (err) {
        res.status(500).json({
            message: 'Internal server error',
            error: err,
        });
    }
};

exports.deleteEmployee = async (req, res) => {
    const employeeId = req.params.id;

    try {
        const deletedEmployee = await Employee.findByIdAndDelete(employeeId);

        if (!deletedEmployee) {
            return res.status(404).json({
                message: 'Employee not found.',
            });
        }

        deletedEmployee.password = undefined;

        res.status(200).json({
            message: 'Employee deleted successfully.',
        });
    } catch (err) {
        res.status(500).json({
            message: 'Internal server error',
            error: err,
        });
    }
};

exports.getProfile = async (req, res) => {
    try {
        const userData = userFromToken(req);
        if(userData){
            const employee = await Employee.findById(userData.id);
    
            if (!employee) {
                return res.status(404).json({
                    message: 'Employee not found.',
                });
            }
    
            employee.password = undefined;
    
            res.status(200).json(employee);
        }
        else {
            res.status(401).json({ message: 'Unauthorized: Missing or invalid token.' });
        }
    } catch (err) {
        res.status(500).json({
            message: 'Internal server Error',
            error: err,
        });
    }
};