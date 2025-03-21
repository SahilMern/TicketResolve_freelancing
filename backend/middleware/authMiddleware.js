const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// ✅ Protect Middleware (User Authentication)
const protect = async (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({ message: 'Not authorized, no token' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.userId).select('-password');

    if (!req.user) {
      return res.status(401).json({ message: 'Not authorized, user not found' });
    }

    next();
  } catch (error) {
    console.error('JWT Error:', error);
    return res.status(401).json({ message: 'Not authorized, invalid token' });
  }
};

// ✅ Admin-Only Middleware
const protectAdmin = async (req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    return res.status(403).json({ message: 'Not authorized as an admin' });
  }
  next();
};

module.exports = { protect, protectAdmin };
