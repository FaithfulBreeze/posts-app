const express = require('express')
const router = express.Router()
const path = require('path')

router.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'))
})

router.get('/login(.html)?', (req, res)=>{
    res.sendFile(path.join(__dirname, '..', 'views', 'login.html'))
})

router.get('/signup(.html)?', (req, res)=>{
    res.sendFile(path.join(__dirname, '..', 'views', 'signup.html'))
})



module.exports = router