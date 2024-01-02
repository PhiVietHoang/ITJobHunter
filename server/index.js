const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const connectWithDB = require('./config/mongoose.js');
const cookieParser = require('cookie-parser');
const EmployeeRoute = require('./routes/EmployeeRoute');
const CompanyRoute = require('./routes/CompanyRoute');
const JobApplicationRoute = require('./routes/JobApplicationRoute');
const JobRoute = require('./routes/JobRoute');
const MessageRoute = require('./routes/MessageRoute');
const socket = require('socket.io');

require('dotenv').config();

// connect with database
connectWithDB();

// Middleware
const app = express();
const corsOptions = {
    exposedHeaders: ['Content-Disposition'],
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json({
    limit: '200mb'
}));

app.use(bodyParser.urlencoded({
    limit: '200mb',
    parameterLimit: 100000,
    extended: true 
}));
// Api routes
app.use('/employee', EmployeeRoute);
app.use('/company', CompanyRoute);
app.use('/jobApplication', JobApplicationRoute);
app.use('/job', JobRoute);
app.use('/message', MessageRoute);
// Start server
const PORT = process.env.PORT;

const server = app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// Connect to Socket.IO
const io = socket(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
        credentials: true,
    },
});

io.on("connection", (socket) => {
  let userId

  socket.on('sendMsg', async (payload) => {
      io.emit('sendMsg', payload);
  });

  socket.on('userIsTyping', async (payload) => {
      const { employeeId, companyId } = payload;
      io.emit('userIsTyping', { employeeId, companyId });
  })

  socket.on('userStopTyping', async (payload) => {
      const { employeeId, companyId } = payload;
      io.emit('userStopTyping', { employeeId, companyId });
  })
});