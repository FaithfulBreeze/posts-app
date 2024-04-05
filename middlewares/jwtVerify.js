const jwt =require('jsonwebtoken')
const dotenv = require('dotenv').config()

const jwtVerify = async (req, res, next) =>{
  const authHeader = req.headers['authorization']
  console.log(authHeader)
  if(!authHeader) return res.status(401).send('Unauthorized')
  const token = authHeader.split(' ')[1]
  jwt.verify(token, process.env.TOKEN_SECRET,(err, user)=>{
    if(err) return res.status(401).send('Unauthorized')
    req.user = user
    next()
  })
}

jwtVerify.refreshTokenVerify = (req, res, next)=>{
  const cookies = req.cookies
  if(!cookies.jwt) return res.status(401).send('Unauthorized')
  jwt.verify(cookies.jwt, process.env.TOKEN_SECRET, (err, user)=>{
    if(err) return res.status(403).send('Unauthorized')

    req.user = user
    console.log(req.user, cookies)
    next()
  })
}

module.exports = jwtVerify