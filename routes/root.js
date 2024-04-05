const express = require('express')
const router = express.Router()
const path = require('path')
const jwtVerify = require('../middlewares/jwtVerify')

//---Routes for pages---
router.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'))
})

router.get('/login(.html)?', (req, res)=>{
    res.sendFile(path.join(__dirname, '..', 'views', 'login.html'))
})

router.get('/signup(.html)?', (req, res)=>{
    res.sendFile(path.join(__dirname, '..', 'views', 'signup.html'))
})

router.get('/user/:username', jwtVerify.refreshTokenVerify, (req, res)=>{
  res.sendFile(path.join(__dirname, '../views/user-page.html'))
})

module.exports = router