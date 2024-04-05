const database = require('./models/connection') //Imports database client
const logEvents = require('./middlewares/logEvents') //imports logEvents function
const express = require('express') //express
const app = express() //express

const cookieParser = require('cookie-parser') //For cookies
app.use(cookieParser())

app.use(express.urlencoded({extended: false})) //For post requests from forms
app.use(logEvents.logRequest) //Logging requests on logs folder

database.connect() //Conecting to the database
.then(()=>{ //On success...
    logEvents.databaseConnect() //Log the database status
    app.listen(process.env.PORT || 3030, logEvents.serverStatus) //Start the server and log server status
})
.catch((err)=>{ //On fail
    logEvents.databaseConnect(err) //Log database status
    logEvents.serverStatus(err) //Log server status
})

app.use('/', require('./routes/root')) //Routes for pages
app.use('/api', require('./routes/api/api')) //Routes for api