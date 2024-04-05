const jwt = require('jsonwebtoken')
const dotenv = require('dotenv').config()
const database = require('../models/connection')

const jwtVerify = (req, res, next)=>{
  const cookies = req.cookies //get cookies!
  
  if(!cookies.jwt) return res.status(401).send('Unauthorized') //no jwt cookie
  
  jwt.verify(cookies.jwt, process.env.TOKEN_SECRET, (err, user)=>{ //is the token valid?
    
    if(err) return res.status(403).send('Unauthorized') //no
    
    database.query(`SELECT refresh_token, username FROM users WHERE id = '${user.payload}'`) //token valid, but does match user token?
    .then((result)=>{
      if(result.rows[0].refresh_token === cookies.jwt){ //yes!
        req.user = user
        next()
      }else{ //no
        res.status(401).send('Unauthorized')
      }
    })
  })
}

module.exports = jwtVerify