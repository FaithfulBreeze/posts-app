const logEvents = require('../middlewares/logEvents')
const database = require('../models/connection')
const dotenv = require('dotenv').config()
const jwt = require('jsonwebtoken')
const {v4} = require('uuid')
const bcrypt = require('bcrypt')

const logUser = (req, res) =>{
    const requestUser = req.body
    database.query(`SELECT * FROM users WHERE username = '${requestUser.username}'`) //Checking username
    .then(result=>{
        const user = result.rows[0]
        if(!user){ //Username not found
            res.status(404).send('User not found.')
        }else if(bcrypt.compareSync(requestUser.password, user.password) == false){ //User found, but wrong password
            res.status(400).send('Wrong password.')
        }else{ //Username found and correct password
            logEvents(`User logged id: ${user.id}.`, 'userEvents.txt')
             const token = jwt.sign(
              {payload:user.id},
              process.env.TOKEN_SECRET,
              { expiresIn: '1h' }
            )
            database.query(`UPDATE users SET refresh_token = '${token}' WHERE id = '${user.id}'`)
            res.cookie(
              'jwt',
              token,
              {
                httpOnly: true,
                maxAge: 1000 * 60 * 60
              }
            )
            res.status(301).redirect(`../user/${user.username}`)
        }
    })
}

module.exports = { logUser }