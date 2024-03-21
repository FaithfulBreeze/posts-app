const logEvents = require('../middlewares/logEvents')
const database = require('../models/connection')
const {v4} = require('uuid')

const logUser = (req, res) =>{
    database.query(`SELECT * FROM users WHERE username = '${req.body.username}'`)
    .then(result=>{
        if(result.rows.length === 0){
            res.send('User not found.')
        }else if(result.rows[0].password !== req.body.password){
            res.send('Wrong password.')
        }else{
            logEvents(`User logged id: ${result.rows[0].id}.`, 'userEvents.txt')
            res.send(result.rows[0])
        }
    })
}

const createUser = (req, res) =>{
    database.query(`SELECT * FROM users WHERE username = '${req.body.username}'`)
    .then(result=>{
        if(result.rows.length === 0){
            let id = v4()
            database.query(`INSERT INTO users(id, first_name, last_name, username, password) VALUES ('${id}', '${req.body.first_name}', '${req.body.last_name}', '${req.body.username}', '${req.body.password}' )`)
            .then((result)=>{
                logEvents(`User created id: ${id}.`, 'userEvents.txt')
                res.send('User created!')
            })
            .catch(()=>{
                logEvents(`User could not be created.`, 'userEvents.txt')
            })

        }else{
            res.send('Username already taken!')
        }
    })
}
module.exports = {
    logUser, 
    createUser
}