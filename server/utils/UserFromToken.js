const jwt = require('jsonwebtoken');

const userFromToken = (req) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = userFromToken;