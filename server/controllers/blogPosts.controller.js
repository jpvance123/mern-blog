const Blog = require('../models/blogModel');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const mongoose = require('mongoose');


const getAllBlogPosts = asyncHandler( async (req, res) => {
  try {
    const allBlogs = await Blog.find()
    res.status(200).json(allBlogs)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
});

const addBlogPost = asyncHandler( async (req, res) => {
  const id = req.params.id
  const { title, description, tags, fileUpload, creator } = req.body

  const createNewPost = await Blog.create({
    title,
    description,
    tags,
    fileUpload,
    creator: id
  })

  await createNewPost.save()

  const userPosts = await User.findById(id)
  userPosts.blogPosts.push(createNewPost)
  await userPosts.save(function(err) {
    if(err){
      res.status(400)
    throw new Error('Invalid Blog Post.')
    }
    res.status(201).json(createNewPost)
  })
});

const getSinglePost = asyncHandler( async (req, res) => {
  const { id } = req.params

  try {
    const singlePost = await Blog.findById(id)

    res.status(200).json(singlePost)
  } catch (error) {
    res.status(400)
    throw new Error('Invalid user data.')
  }
});

const updateBlogPost = asyncHandler( async (req, res) => {
  const { id } = req.params
  const { title, description, tags, fileUpload } = req.body

  if(!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({message: `post ${id} not found`})
  
  const updateBlogPost = {
    title,
    description,
    tags,
    fileUpload,
    _id: id,
  }
  try {
    await Blog.findByIdAndUpdate(id, updateBlogPost, {new: true})
    res.status(200).json(updateBlogPost)
  } catch (error) {
    res.status(400)
    throw new Error('Invalid Post Data.')
  }
});

const removeBlogPost = asyncHandler( async (req, res) => {
  const { id } = req.params

  if(!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({message: `post ${id} not found`})
  
  try {
    await Blog.findByIdAndRemove(id)
    res.status(200).json({ message: 'Success deleting Post!'})
  } catch (error) {
    res.status(400)
    throw new Error(' Post could not be deleted at this time.')
  }
});

const likeBlogPost = asyncHandler( async (req, res) => {
  const { id } = req.params

  console.log(id)
  if(!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({message: `post ${id} not found`})
  
  const post = await Blog.findById(id)

  if(post){
    const updateBlogPost = await Blog.findByIdAndUpdate(
      id,
      { upVote: post.upVote + 1},
      { new: true }
    )

    res.status(200).json(updateBlogPost)
  } else {
    res.status(400)
    throw new Error('Post could not be Liked.')
  }
});


module.exports = {
  getAllBlogPosts,
  getSinglePost,
  addBlogPost,
  updateBlogPost,
  removeBlogPost,
  likeBlogPost,
};