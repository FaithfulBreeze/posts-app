const logEvents = require('../middlewares/logEvents')
const {Client} = require('pg')
const dotenv = require('dotenv')
dotenv.config()

const database = new Client(`postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@kesavan.db.elephantsql.com/${process.env.DB_NAME}`)

module.exports = database.connect()
.then(()=>{
    logEvents('Connected to the database.', 'databaseEvents.txt')
    return {error: false}
})
.catch(()=>{
    logEvents(`Could not connect to the database`, 'databaseEvents.txt')
})