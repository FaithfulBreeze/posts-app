const express = require('express')
const router = express.Router()
const userController = require('../../controllers/userController')
const authController = require('../../controllers/authController')
const jwtVerify = require('../../middlewares/jwtVerify')

//---Routes for pages---
router.post('/login', authController.logUser)
router.post('/signup', userController.createUser)

router.get('/userData/',jwtVerify, userController.getUserData)

router.put('/logout', jwtVerify, userController.logoutUser)

module.exports = router