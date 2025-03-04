// const jwt = require('jsonwebtoken')
// const asyncHandler = require('express-async-handler')
// const User = require('../models/userModel')

// const protect = asyncHandler(async (req, res, next) => {
//   let token

//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith('Bearer')
//   ) {
//     try {
//       // Get token from header
//       token = req.headers.authorization.split(' ')[1]
//       // Verify token
//       const decoded = jwt.verify(token, process.env.JWT_SECRET)
//       // Get user from token
//       req.user = await User.findById(decoded.id).select('-password')
//       // NOTE: We need to check if a user was found
//       // https://www.udemy.com/course/react-front-to-back-2022/learn/lecture/30591026#questions/17843570
//       if (!req.user) {
//         res.status(401)
//         throw new Error('Not authorized')
//       }

//       next()
//     } catch (error) {
//       console.log(error)
//       res.status(401)
//       throw new Error('Not authorized')
//     }
//   }

//   if (!token) {
//     res.status(401)
//     throw new Error('Not authorized')
//   }
// })

// module.exports = { protect }
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const protect = async (req, res, next) => {
    let token;

    //  हेडर में Authorization चेक करें
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1]; //  "Bearer token" से सिर्फ टोकन लें

            console.log("received token", token);
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decoded, "data in middleware");
            req.user = decoded; //  यूजर डेटा जोड़ें

            
            req.user = await userModel.findById(decoded.userId).select("-password"); //  यूजर डेटा जोड़ें
            if (!req.user) {
              return res.status(401).json({ message: "User not found" });
          }
            next();
        } catch (error) {
          console.error("JWT Error:", error);
          res.status(401).json({ message: "Invalid token" });
        }
    } else {
        res.status(401).json({ message: "Not authorized, no token" });
    }
};

module.exports = { protect };

