const jwt =require('jsonwebtoken')
const dotenv = require('dotenv').config()
const database = require('../models/connection')

const jwtVerify = (req, res, next)=>{
  const cookies = req.cookies
  if(!cookies.jwt) return res.status(401).send('Unauthorized')
  jwt.verify(cookies.jwt, process.env.TOKEN_SECRET, (err, user)=>{
    if(err) return res.status(403).send('Unauthorized')
    database.query(`SELECT refresh_token, username FROM users WHERE id = '${user.payload}'`)
    .then((result)=>{
      if(result.rows[0].refresh_token === cookies.jwt){
        req.user = user
        next()
      }else{
        res.status(401).send('Unauthorized')
      }
    })
  })
}

module.exports = jwtVerify