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
exports.jwtVerify = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const databaseConnection_1 = require("../services/databaseConnection");
dotenv_1.default.config();
const jwtVerify = (req, res, next) => {
    const cookies = req.cookies; //get cookies!
    if (!cookies.jwt)
        return res.status(401).send('Unauthorized'); //no jwt cookie
    jsonwebtoken_1.default.verify(cookies.jwt, process.env.TOKEN_SECRET, (err, user) => __awaiter(void 0, void 0, void 0, function* () {
        if (err || !user)
            return res.status(403).send('Unauthorized'); //no
        user = user;
        const data = yield databaseConnection_1.prisma.users.findFirst({
            where: {
                id: user.payload
            },
            select: {
                refresh_token: true
            }
        });
        if (!data)
            return res.status(404).json({ message: "Resource not found." });
        if (data.refresh_token == cookies.jwt) {
            req.user = user;
            next();
        }
        else { //no
            res.status(401).send('Unauthorized');
        }
    }));
};
exports.jwtVerify = jwtVerify;
