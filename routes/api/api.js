const express = require('express')
const router = express.Router()
const userController = require('../../controllers/userController')
const authController = require('../../controllers/authController')
const postController = require('../../controllers/postController')
const jwtVerify = require('../../middlewares/jwtVerify')

//---Routes for controlling---
router.post('/login', authController.logUser) //handling login
router.post('/signup', userController.createUser) //handling signup
router.post('/createPost', jwtVerify, postController.createPost) //handling post creation
router.get('/userData/',jwtVerify, userController.getUserData) //sends user info for populating user page
router.get('/userData/:id',jwtVerify, userController.getUserData) //sends user info for populating user page
router.get('/userPosts/', jwtVerify, postController.getUserPosts) //sends user posts for populating user page
router.get('/userPosts/:id', jwtVerify, postController.getUserPosts) //sends user posts for populating user page
router.get('/feedPosts', postController.getFeedPosts) //populates feed page
router.put('/logout', jwtVerify, authController.logoutUser) //handling logout
router.delete('/deletePost/:id', jwtVerify, postController.deletePost) //handle post deletion
router.delete('/deleteUser', jwtVerify, userController.deleteUser) //deletes current user

module.exports = router