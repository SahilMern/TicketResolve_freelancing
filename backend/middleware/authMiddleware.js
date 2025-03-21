const jwt = require('jsonwebtoken')
const User = require('../models/userModel') // Ensure the correct path

// Protect Middleware (for user authentication)
const protect = async (req, res, next) => {
  let token

  console.log(req.cookies.token, 'req.cookies.token')

  // Get token from cookies
  if (req.cookies.token) {
    try {
      token = req.cookies.token
      console.log(token, '------------------')

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      console.log(decoded, 'deeee')

      // Get user from token
      req.user = await User.findById(decoded.userId).select('-password')
      if (!req.user) {
        return res
          .status(401)
          .json({ message: 'Not authorized, user not found' })
      }

      next() // Proceed to the next middleware or route handler
    } catch (error) {
      console.error(error)
      return res.status(401).json({ message: 'Not authorized, invalid token' })
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' })
  }
}

// Admin-specific protect middleware
const protectAdmin = async (req, res, next) => {
  // First, ensure the user is authenticated
  await protect(req, res, () => {
    // Check if the user is an admin
    console.log('------------')

    if (req.user && req.user.isAdmin) {
      next() // If the user is an admin, proceed to the next middleware/route handler
    } else {
      return res.status(403).json({ message: 'Not authorized as an admin' }) // Forbidden if not admin
    }
  })
}

module.exports = { protect, protectAdmin }
