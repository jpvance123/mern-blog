const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title.']
  },
  description: {
    type: String,
    required: [true, 'Please provide a description.']
  },
  tags: {
    type: [String],
    required: [true, 'Please add at least one Tag.']
  },
  fileUpload: {
    type: String
  },
  upVote: {
    type: Number,
    default: 0,
  },
  creator: [{ 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User'
  }],
  createdAt: {
    type: Date,
    default: new Date(),
  }, 
});

module.exports = mongoose.model('BlogPosts', blogSchema)
