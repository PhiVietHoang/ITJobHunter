const Company = require('../models/CompanyModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userFromToken = require('../utils/UserFromToken');

exports.register = async (req, res) => {
    try {
        const { companyName, email, password } = req.body;

        if (!companyName || !email || !password) {
            return res.status(400).json({
                message: 'Company name, email, and password are required.',
            });
        }

        let company = await Company.findOne({ email });

        if (company) {
            return res.status(400).json({
                message: 'Company already registered.',
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        company = await Company.create({
            companyName,
            email,
            password: hashedPassword,
        });

        company.password = undefined;

        res.status(200).json({
            company,
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
        const company = await Company.findOne({ email });

        if (company) {
            const validatedPassword = await bcrypt.compare(password, company.password);
            if (validatedPassword) {
                const token = jwt.sign(
                    { email: company.email, id: company._id },
                    process.env.JWT_SECRET,
                    { expiresIn: process.env.JWT_EXPIRY }
                );

                company.password = undefined;

                res.status(200).json({
                    company,
                    token,
                });
            } else {
                res.status(401).json({
                    message: 'Email or password is incorrect.',
                });
            }
        } else {
            res.status(400).json({
                message: 'Company not found.',
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

exports.getAllCompanies = async (req, res) => {
    try {
        const companies = await Company.find({});

        companies.forEach((company) => {
            company.password = undefined;
        });

        res.status(200).json(companies);
    } catch (err) {
        res.status(500).json({
            message: 'Internal server error',
            error: err,
        });
    }
};

exports.getCompanyById = async (req, res) => {
    const companyId = req.params.id;

    try {
        const company = await Company.findById(companyId);

        if (!company) {
            return res.status(404).json({
                message: 'Company not found.',
            });
        }

        company.password = undefined;

        res.status(200).json(company);
    } catch (err) {
        res.status(500).json({
            message: 'Internal server error',
            error: err,
        });
    }
};

exports.updateCompany = async (req, res) => {
    const companyId = req.params.id;
    const { companyName, email, phoneNumber, companyEmails, companyWebsites, companyPhoneNumbers, companyLocations, companyLogo, description } = req.body;

    try {
        if (email) {
            const existingCompany = await Company.findOne({ email });
            if (existingCompany && existingCompany._id.toString() !== companyId) {
                return res.status(400).json({
                    message: 'Email is already registered.',
                });
            }
        }

        const updatedCompany = await Company.findByIdAndUpdate(
            companyId,
            {
                companyName,
                email,
                phoneNumber,
                companyEmails,
                companyWebsites,
                companyPhoneNumbers,
                companyLocations,
                companyLogo,
                description,
            },
            { new: true }
        );

        if (!updatedCompany) {
            return res.status(404).json({
                message: 'Company not found.',
            });
        }

        updatedCompany.password = undefined;

        res.status(200).json(updatedCompany);
    } catch (err) {
        res.status(500).json({
            message: 'Internal server error',
            error: err,
        });
    }
};

exports.deleteCompany = async (req, res) => {
    const companyId = req.params.id;

    try {
        const deletedCompany = await Company.findByIdAndDelete(companyId);

        if (!deletedCompany) {
            return res.status(404).json({
                message: 'Company not found.',
            });
        }

        deletedCompany.password = undefined;

        res.status(200).json({
            message: 'Company deleted successfully.',
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
            const company = await Company.findById(userData.id);
    
            if (!company) {
                return res.status(404).json({
                    message: 'Company not found.',
                });
            }
    
            company.password = undefined;
    
            res.status(200).json(company);
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