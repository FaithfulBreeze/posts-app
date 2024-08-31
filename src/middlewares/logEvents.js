"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logEvents = void 0;
const promises_1 = __importDefault(require("fs/promises"));
const fs_1 = __importDefault(require("fs"));
const uuid_1 = require("uuid");
const date_fns_1 = require("date-fns");
const path_1 = __importDefault(require("path"));
//Function for logging
const logEvents = (msg, filename) => __awaiter(void 0, void 0, void 0, function* () {
    if (!fs_1.default.existsSync(path_1.default.join(__dirname, '..', 'logs'))) { //Checks if the log folder exists, if not then create
        yield promises_1.default.mkdir(path_1.default.join(__dirname, '..', 'logs'));
    }
    //Writing...
    promises_1.default.appendFile(path_1.default.join(__dirname, '..', 'logs', `${filename}`), `${(0, date_fns_1.format)(new Date(), 'dd-MM-yyy:kk-mm-ss')}\t${(0, uuid_1.v4)()}\t${msg}\n`);
});
exports.logEvents = logEvents;
//For Requests
exports.logEvents.logRequest = (req, res, next) => {
    (0, exports.logEvents)(`${req.method}\t${req.url}\t${req.headers.origin}`, 'requestLogs.txt');
    next();
};
//For Database
exports.logEvents.databaseConnect = (err) => {
    if (!err)
        (0, exports.logEvents)('Connected to the database.', 'databaseEvents.txt');
    else
        (0, exports.logEvents)('Could not connect to the database.', 'databaseEvents.txt');
};
//For Server
exports.logEvents.serverStatus = (err) => {
    if (!err)
        (0, exports.logEvents)('Server online.', 'serverStatus.txt');
    else
        (0, exports.logEvents)('Server could not start.', 'serverStatus.txt');
};
