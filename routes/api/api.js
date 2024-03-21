const express = require('express')
const router = express.Router()
const userController = require('../../controllers/userController')

//---Routes for pages---
router.post('/login', userController.logUser)

router.post('/signup', userController.createUser)

module.exports = router