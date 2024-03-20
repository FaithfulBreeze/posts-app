const database = require('./models/connection')
const logEvents = require('./middlewares/logEvents')
const express = require('express')
const app = express()
database.then(({error})=>{
    if(!error){
        app.listen(process.env.PORT || 3030)
        logEvents('Server online.', 'serverStatus.txt')
    }
}).catch(()=>{
    logEvents('Could not start server.', 'serverStatus.txt')
})

app.get('/', (req, res)=>{
    res.send('Running!')
})