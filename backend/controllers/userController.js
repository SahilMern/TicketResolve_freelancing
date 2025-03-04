const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../models/userModel')

// @desc    Register a new user
// @route   /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  // Validation: Ensure all fields are provided
  if (!name || !email || !password) {
    return res.status(400).json({
      message: 'Please include all fields (name, email, password)',
    })
  }

  // Check if user already exists
  const userExists = await User.findOne({ email })
  if (userExists) {
    return res.status(400).json({
      message: 'User already exists with this email',
    })
  }

  // Hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  // Create new user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  })

  if (user) {
    // Successfully created user, generate and return token
    return res.status(201).json({
      message: 'User registered successfully!',
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    })
  } else {
    return res.status(400).json({
      message: 'Invalid user data, unable to create user',
    })
  }
})



// @desc    Login a user
// @route   /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })
  console.log(user, "User in login page ---");
  
  // Check user and passwords match
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
      isAdmin:user.isAdmin,
    })
  } else {
    res.status(401)
    throw new Error('Invalid credentials')
  }
})

// @desc    Get current user
// @route   /api/users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  const user = {
    userId: req.user._id,
    email: req.user.email,
    name: req.user.name,
  }
  res.status(200).json(user)
})

// Generate token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
}

module.exports = {
  registerUser,
  loginUser,
  getMe,
}
