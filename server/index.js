const express = require('express');
const cors = require('cors');
const connectWithDB = require('./config/mongoose.js');
require('dotenv').config();

// connect with database
connectWithDB();

const app = express()

app.get('/',(req, res)=>res.send('Hello'))

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))