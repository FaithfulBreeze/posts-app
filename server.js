const database = require('./models/connection')
const logEvents = require('./middlewares/logEvents')
const express = require('express')
const app = express()

app.use(express.urlencoded({extended: false}))

database.connect()
.then(()=>{
    logEvents('Connected to the database.', 'databaseEvents.txt' )
    app.listen(process.env.PORT || 3030)
    logEvents('Server online.', 'serverStatus.txt')
})
.catch(()=>{
    logEvents('Could not connect to the database.', 'databaseEvents.txt' )
    logEvents('Server could not start..', 'serverStatus.txt')
})

app.use('/', require('./routes/root'))
app.use('/api', require('./routes/api/api'))