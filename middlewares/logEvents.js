const fsPromise = require('fs').promises
const fs = require('fs')
const {v4} = require('uuid')
const {format} = require('date-fns')
const path =  require('path')

const logEvents = async (msg, filename) =>{
    if(!fs.existsSync(path.join(__dirname, '..', 'logs'))){ 
        await fsPromise.mkdir(path.join(__dirname, '..', 'logs'))
    }
    fsPromise.appendFile(path.join(__dirname, '..', 'logs', `${filename}`), `${format(new Date(), 'dd-MM-yyy:kk-m-ss')}\t${v4()}\t${msg}\n`)
}
module.exports = logEvents