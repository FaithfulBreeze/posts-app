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
Object.defineProperty(exports, "__esModule", { value: true });
exports.startServer = exports.prisma = void 0;
const client_1 = require("@prisma/client");
const server_1 = require("../server");
const logEvents_1 = require("../middlewares/logEvents");
exports.prisma = new client_1.PrismaClient();
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield exports.prisma.$connect();
        server_1.app.listen(4040, () => {
            console.log('Server running...');
            logEvents_1.logEvents.databaseConnect();
            logEvents_1.logEvents.serverStatus();
        });
    }
    catch (error) {
        logEvents_1.logEvents.databaseConnect(error);
        logEvents_1.logEvents.serverStatus(error);
    }
});
exports.startServer = startServer;
