const jwt = require('jsonwebtoken');
const UserModel = require('../models/user');

const auth = (req, res, next) => {
  const token = req.cookies.token;
  if (token) {
    jwt.verify(token, "secretkey", (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Unauthorized" });
      } else {
        req.user = decoded;
        next();
      }
    });
  } else {
    return res.status(401).json({ message: "No token provided" });
  }
};

module.exports = auth;