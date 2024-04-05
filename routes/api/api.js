const express = require('express')
const router = express.Router()
const userController = require('../../controllers/userController')
const authController = require('../../controllers/authController')
const postController = require('../../controllers/postController')
const jwtVerify = require('../../middlewares/jwtVerify')

//---Routes for controlling---
router.post('/login', authController.logUser) //handling login
router.put('/logout', jwtVerify, authController.logoutUser) //handling logout
router.post('/signup', userController.createUser) //handling signup
router.get('/userData/',jwtVerify, userController.getUserData) //sends user info for populating user page
router.get('/userPosts', jwtVerify, postController.getUserPosts) //sends user posts for populating user page
router.post('/createPost', jwtVerify, postController.createPost) //handling post creation
router.delete('/deletePost/:id', jwtVerify, postController.deletePost) //handle post deletion
router.get('/getFeedPosts', postController.getFeedPosts) //populates feed page
module.exports = router