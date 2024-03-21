const logEvents = require('../middlewares/logEvents')
const database = require('../models/connection')
const {v4} = require('uuid')
const bcrypt = require('bcrypt')

const logUser = (req, res) =>{
    database.query(`SELECT * FROM users WHERE username = '${req.body.username}'`) //Checking username
    .then(result=>{
        if(result.rows.length === 0){ //Username not found
            res.send('User not found.')
        }else if(bcrypt.compareSync(req.body.password, result.rows[0].password) == false){ //User found, but wrong password
            res.send('Wrong password.')
        }else{ //Username found and correct password
            logEvents(`User logged id: ${result.rows[0].id}.`, 'userEvents.txt')
            res.send(result.rows[0])
        }
    })
}

const createUser = (req, res) =>{
    database.query(`SELECT * FROM users WHERE username = '${req.body.username}'`) //Checking username
    .then(result=>{
        if(result.rows.length === 0){ //User does not exist, creating...
            const id = v4()
            const hashedPassword = bcrypt.hashSync(req.body.password, 10) //Hashing the password before writing to DB
            database.query(`INSERT INTO users(id, first_name, last_name, username, password) VALUES ('${id}', '${req.body.first_name}', '${req.body.last_name}', '${req.body.username}', '${hashedPassword}' )`)
            .then(()=>{ //Success on creating user
                logEvents(`User created id: ${id}.`, 'userEvents.txt')
                res.send('User created!')
            })
            .catch(()=>{ //Fail on creating user
                logEvents(`User could not be created.`, 'userEvents.txt')
            })
        }else{ //Username already in use
            logEvents(`User could not be created.`, 'userEvents.txt')
            res.send('Username already taken!')
        }
    })
}
module.exports = {
    logUser, 
    createUser
}