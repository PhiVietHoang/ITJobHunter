const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv')
const connectWithDB = require('./config/mongoose.js');
const cookieParser = require('cookie-parser');
const EmployeeRoute = require('./routes/EmployeeRoute');
const CompanyRoute = require('./routes/CompanyRoute');
require('dotenv').config();

// connect with database
connectWithDB();

const app = express()
app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use('/employee', EmployeeRoute);
app.use('/company', CompanyRoute);

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))