"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const jwtVerify_1 = require("../middlewares/jwtVerify");
const router = express_1.default.Router();
exports.default = router;
//---Routes for pages---
router.get('/', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '..', 'views', 'index.html'));
});
router.get('/login(.html)?', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '..', 'views', 'login.html'));
});
router.get('/signup(.html)?', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '..', 'views', 'signup.html'));
});
router.get('/user/:username', jwtVerify_1.jwtVerify, (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../views/user-page.html'));
});
router.get('/create-post', jwtVerify_1.jwtVerify, (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '..', 'views', 'create-post.html'));
});
router.get('/feed', jwtVerify_1.jwtVerify, (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '..', 'views', 'feed.html'));
});
router.get('/author/:id', jwtVerify_1.jwtVerify, (req, res) => {
    if (req.params.id === req.user.payload)
        return res.status(301).redirect('/user/user-page');
    res.sendFile(path_1.default.join(__dirname, '../views/author-page.html'));
});
