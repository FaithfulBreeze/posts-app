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

router.get('/user/:username', jwtVerify, (req, res)=>{
  res.sendFile(path.join(__dirname, '../views/user-page.html'))
})

router.get('/create-post', jwtVerify, (req, res)=>{
  res.sendFile(path.join(__dirname, '..', 'views', 'create-post.html'))
})

router.get('/feed', jwtVerify, (req, res)=>{
  res.sendFile(path.join(__dirname, '..', 'views', 'feed.html'))
})

router.get('/author/:id', jwtVerify, (req, res)=>{
  if(req.params.id === req.user.payload) return res.status(301).redirect('/user/user-page')
  res.sendFile(path.join(__dirname, '../views/author-page.html'))
})

module.exports = router