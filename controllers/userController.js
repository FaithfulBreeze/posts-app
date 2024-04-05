const logEvents = require('../middlewares/logEvents')
const database = require('../models/connection')
const {v4} = require('uuid')
const bcrypt = require('bcrypt')
const path = require('path')

const createUser = (req, res) =>{
    database.query(`SELECT * FROM users WHERE username = '${req.body.username}'`) //Checking username
    .then(result=>{
        if(result.rows.length === 0){ //User does not exist, creating...
            const id = v4()
            const hashedPassword = bcrypt.hashSync(req.body.password, 10) //Hashing the password before writing to DB
            database.query(`INSERT INTO users(id, first_name, last_name, username, password) VALUES ('${id}', '${req.body.first_name}', '${req.body.last_name}', '${req.body.username}', '${hashedPassword}' )`)
            .then(()=>{ //Success on creating user
                logEvents(`User created id: ${id}.`, 'userEvents.txt')
                res.status(301).redirect('/login')
            })
            .catch(()=>{ //Fail on creating user
                logEvents(`User could not be created.`, 'userEvents.txt')
                res.status(500).send('Error on creating user.')
            })
        }else{ //Username already in use
            logEvents(`User could not be created.`, 'userEvents.txt')
            res.status(400).send('Username already taken!')
        }
    })
}

const getUserData = (req, res)=>{ //user data for frontend
    database.query(`SELECT first_name, last_name, username, id FROM users WHERE id = '${req.user.payload}'`)
    .then(result=>{
      res.json(result.rows[0])
    })
}


module.exports = { createUser, getUserData }