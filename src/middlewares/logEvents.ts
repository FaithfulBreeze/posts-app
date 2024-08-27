import fsPromise from 'fs/promises'
import fs from 'fs'
import { Request, Response, NextFunction } from 'express'
import { v4 } from 'uuid'
import { format } from 'date-fns'
import path from 'path'

//Function for logging
export const logEvents = async (msg: string, filename: string) =>{
    if(!fs.existsSync(path.join(__dirname, '..', 'logs'))){ //Checks if the log folder exists, if not then create
        await fsPromise.mkdir(path.join(__dirname, '..', 'logs'))
    }
    //Writing...
    fsPromise.appendFile(path.join(__dirname, '..', 'logs', `${filename}`), `${format(new Date(), 'dd-MM-yyy:kk-mm-ss')}\t${v4()}\t${msg}\n`)
}

//For Requests
logEvents.logRequest = (req: Request, res: Response, next: NextFunction)=>{
    logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, 'requestLogs.txt')
    next()
    
}

//For Database
logEvents.databaseConnect = (err?: unknown)=>{
    if(!err) logEvents('Connected to the database.', 'databaseEvents.txt' )
    else logEvents('Could not connect to the database.', 'databaseEvents.txt' )
}

//For Server
logEvents.serverStatus = (err?: unknown)=>{
    if(!err) logEvents('Server online.', 'serverStatus.txt')
    else logEvents('Server could not start.', 'serverStatus.txt')
}
