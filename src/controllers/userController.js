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
const uuid_1 = require("uuid");
const bcrypt_1 = __importDefault(require("bcrypt"));
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let user;
    try {
        user = yield databaseConnection_1.prisma.users.findFirst({
            where: {
                username: req.body.username
            }
        });
    }
    catch (error) {
        return res.status(500).json(error);
    }
    if (!user) {
        try {
            const id = (0, uuid_1.v4)();
            const hashedPassword = bcrypt_1.default.hashSync(req.body.password, 10); //Hashing the password before writing to DB
            req.body.password = hashedPassword;
            req.body.id = id;
            yield databaseConnection_1.prisma.users.create({
                data: req.body
            });
            (0, logEvents_1.logEvents)(`User created id: ${id}.`, 'userEvents.txt');
            return res.status(201).redirect('/login');
        }
        catch (error) {
            (0, logEvents_1.logEvents)(`User could not be created.`, 'userEvents.txt');
            return res.status(500).send('Error on creating user.');
        }
    }
    else {
        (0, logEvents_1.logEvents)(`User could not be created.`, 'userEvents.txt');
        return res.status(400).send('Username already taken!');
    }
});
const getUserData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        if (id) { //another user
            const user = yield databaseConnection_1.prisma.users.findFirst({
                where: {
                    id
                },
                select: {
                    id: true,
                    first_name: true,
                    last_name: true,
                    username: true
                }
            });
            return res.status(200).json(user);
        }
        else { //current user
            const user = yield databaseConnection_1.prisma.users.findFirst({
                where: {
                    id: req.user.payload
                },
                select: {
                    id: true,
                    first_name: true,
                    last_name: true,
                    username: true
                }
            });
            return res.status(200).json(user);
        }
    }
    catch (error) {
        return res.status(500).json(error);
    }
});
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield databaseConnection_1.prisma.posts.deleteMany({
            where: {
                owner: req.user.payload
            }
        });
        yield databaseConnection_1.prisma.users.delete({
            where: {
                id: req.user.payload
            }
        });
        res.clearCookie('jwt'); //clears cookie
        return res.status(204).end();
    }
    catch (error) {
        return res.status(500).json(error);
    }
});
exports.default = {
    createUser,
    getUserData,
    deleteUser
};
