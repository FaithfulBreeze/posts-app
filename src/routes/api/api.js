"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = __importDefault(require("../../controllers/userController"));
const authController_1 = __importDefault(require("../../controllers/authController"));
const postController_1 = __importDefault(require("../../controllers/postController"));
const jwtVerify_1 = require("../../middlewares/jwtVerify");
const router = express_1.default.Router();
exports.default = router;
//---Routes for controlling---
router.post('/login', authController_1.default.logUser); //handling login
router.post('/signup', userController_1.default.createUser); //handling signup
router.post('/createPost', jwtVerify_1.jwtVerify, postController_1.default.createPost); //handling post creation
router.get('/userData/', jwtVerify_1.jwtVerify, userController_1.default.getUserData); //sends user info for populating user page
router.get('/userData/:id', jwtVerify_1.jwtVerify, userController_1.default.getUserData); //sends user info for populating user page
router.get('/userPosts/', jwtVerify_1.jwtVerify, postController_1.default.getUserPosts); //sends user posts for populating user page
router.get('/userPosts/:id', jwtVerify_1.jwtVerify, postController_1.default.getUserPosts); //sends user posts for populating user page
router.get('/feedPosts', postController_1.default.getFeedPosts); //populates feed page
router.put('/logout', jwtVerify_1.jwtVerify, authController_1.default.logoutUser); //handling logout
router.delete('/deletePost/:id', jwtVerify_1.jwtVerify, postController_1.default.deletePost); //handle post deletion
router.delete('/deleteUser', jwtVerify_1.jwtVerify, userController_1.default.deleteUser); //deletes current user
