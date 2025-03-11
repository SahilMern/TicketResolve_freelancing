const jwt = require('jsonwebtoken');
const User = require('../models/userModel'); // Ensure the correct path

const protect = async (req, res, next) => {
  let token;
console.log(req.cookies.token, "req.cookies.token");

  // Get token from cookies
  if (req.cookies.token) {
    try {
      token = req.cookies.token;
      console.log(token, "------------------");
      
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decoded, "deeee");
      
      // Get user from token
      req.user = await User.findById(decoded.userId).select('-password');
      if (!req.user) {
        return res.status(401).json({ message: 'Not authorized, user not found' });
      }

      next();
    } catch (error) {
      return res.status(401).json({ message: 'Not authorized, invalid token' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = { protect };
