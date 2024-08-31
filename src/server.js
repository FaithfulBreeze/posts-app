"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const logEvents_1 = require("./middlewares/logEvents"); //imports logEvents function
const databaseConnection_1 = require("./services/databaseConnection");
const express_1 = __importDefault(require("express")); //express
const cookie_parser_1 = __importDefault(require("cookie-parser")); //For cookies
const root_1 = __importDefault(require("./routes/root"));
const api_1 = __importDefault(require("./routes/api/api"));
const path_1 = require("path");
exports.app = (0, express_1.default)(); //express
(0, databaseConnection_1.startServer)();
exports.app.use(express_1.default.urlencoded({ extended: false })); //For post requests from forms
exports.app.use(express_1.default.static((0, path_1.join)(__dirname, 'public')));
exports.app.use(logEvents_1.logEvents.logRequest); //Logging requests on logs folder
exports.app.use((0, cookie_parser_1.default)());
exports.app.use('/', root_1.default); //Routes for pages
exports.app.use('/api', api_1.default); //Routes for api
