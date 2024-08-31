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
const logEvents_1 = require("../middlewares/logEvents");
const databaseConnection_1 = require("../services/databaseConnection");
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
dotenv_1.default.config();
const logUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const requestedUser = req.body;
        const user = yield databaseConnection_1.prisma.users.findFirst({
            where: {
                username: requestedUser.username
            }
        });
        if (!user)
            return res.status(404).send('User not found.');
        if (bcrypt_1.default.compareSync(requestedUser.password, user.password) == false)
            return res.status(400).send('Wrong password.');
        (0, logEvents_1.logEvents)(`User logged id: ${user.id}.`, 'userEvents.txt');
        const token = jsonwebtoken_1.default.sign(//generating jwt for user
        { payload: user.id }, process.env.TOKEN_SECRET, { expiresIn: '12h' });
        yield databaseConnection_1.prisma.users.update({
            where: {
                id: user.id
            },
            data: {
                refresh_token: token
            }
        });
        (0, logEvents_1.logEvents)(`Token generated for user: ${user.id}\nToken: ${token}\n`, 'tokensHistory.txt');
        res.cookie(//sets jwt as cookie on browser
        'jwt', token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60
        });
        return res.status(301).redirect(`../user/${user.username}`); //Redirecting for user page
    }
    catch (error) {
        return res.status(500).json(error);
    }
});
const logoutUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield databaseConnection_1.prisma.users.update({
            where: {
                id: req.user.payload
            },
            data: {
                refresh_token: null
            }
        });
        (0, logEvents_1.logEvents)(`Token deleted for user: ${req.user.payload}\nToken: ${req.cookies.jwt}\n`, 'tokensHistory.txt');
        (0, logEvents_1.logEvents)(`User logged off id: ${req.user.payload}.`, 'userEvents.txt');
        return res.status(204).clearCookie('jwt').end(); //Clears cookie
    }
    catch (error) {
        return res.status(500).json(error);
    }
});
exports.default = {
    logUser,
    logoutUser
};
