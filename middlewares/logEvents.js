const fsPromise = require('fs').promises
const fs = require('fs')
const {v4} = require('uuid')
const {format} = require('date-fns')
const path =  require('path')

//Function for logging
const logEvents = async (msg, filename) =>{
    if(!fs.existsSync(path.join(__dirname, '..', 'logs'))){ //Checks if the log folder exists, if not then create
        await fsPromise.mkdir(path.join(__dirname, '..', 'logs'))
    }
    //Writing...
    fsPromise.appendFile(path.join(__dirname, '..', 'logs', `${filename}`), `${format(new Date(), 'dd-MM-yyy:kk-mm-ss')}\t${v4()}\t${msg}\n`)
}

//For Requests
logEvents.logRequest = (req, res, next)=>{
    logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, 'requestLogs.txt')
    next()
    
}

//For Database
logEvents.databaseConnect = (err)=>{
    if(!err) logEvents('Connected to the database.', 'databaseEvents.txt' )
    else logEvents('Could not connect to the database.', 'databaseEvents.txt' )
}

//For Server
logEvents.serverStatus = (err)=>{
    if(!err) logEvents('Server online.', 'serverStatus.txt')
    else logEvents('Server could not start.', 'serverStatus.txt')
}

module.exports = logEvents