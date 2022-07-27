const express = require('express')
const router = express.Router()
const { getAllBlogPosts, getSinglePost, addBlogPost, updateBlogPost, removeBlogPost, likeBlogPost } = require('../controllers/blogPosts.controller')


router.route('/').get(getAllBlogPosts)
router.route('/:id').get(getSinglePost).patch(updateBlogPost).delete(removeBlogPost).post(addBlogPost)
router.route('/:id/likedBlogPost').patch(likeBlogPost)


module.exports = router