const dotenv = require('dotenv').config()
const {Client} = require('pg')
//Creating a client
const database = new Client(`postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@kesavan.db.elephantsql.com/${process.env.DB_NAME}`)

module.exports = database