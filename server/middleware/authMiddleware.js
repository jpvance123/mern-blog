const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

const protect = asyncHandler(async (req, res, next) => {
  let token

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // GET TOKEN FROM HEADER 
      token = req.headers.authorization.split(' ')[1] // Bearer = 0 Token = 1 [bearer, Token]
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      // GET user from the token
      req.user = await User.findById(decoded.id).select('-password')

      next()
    } catch (error) {
      console.log(error)
      res.status(401)
      throw new Error('Not authorized')
    }
  };

  if (!token) {
    res.status(401)
    throw new Error('Not autorized, no token')
  }
});



module.exports = {
  protect
};