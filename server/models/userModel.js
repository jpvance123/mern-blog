const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name']
  },
  email: {
    type: String,
    required: [true, 'Please add your email'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Please add your password']
  },
  blogPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'BlogPosts'}]
})

module.exports = mongoose.model('User', userSchema)
