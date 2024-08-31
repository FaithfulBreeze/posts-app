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
const databaseConnection_1 = require("../services/databaseConnection");
const uuid_1 = require("uuid");
const getUserPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.params.id) { //another user
        try {
            const posts = yield databaseConnection_1.prisma.posts.findMany({
                where: {
                    owner: req.params.id
                },
                orderBy: {
                    post_timestamp: 'desc'
                }
            });
            return res.status(200).json({ posts });
        }
        catch (error) {
            return res.status(500).json(error);
        }
    }
    else { //current user
        try {
            const posts = yield databaseConnection_1.prisma.posts.findMany({
                where: {
                    owner: req.user.payload
                },
                orderBy: {
                    post_timestamp: 'desc'
                }
            });
            return res.status(200).json({ posts });
        }
        catch (error) {
            return res.status(500).json(error);
        }
    }
});
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { post_name, post_content } = req.body;
    try {
        yield databaseConnection_1.prisma.posts.create({
            data: {
                id: (0, uuid_1.v4)(),
                post_name,
                post_content,
                owner: req.user.payload
            }
        });
        res.status(201).redirect('../user/user-page');
    }
    catch (error) {
        res.status(500).json(error);
    }
});
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield databaseConnection_1.prisma.posts.delete({
            where: {
                id: req.params.id,
                owner: req.user.payload
            }
        });
        res.status(204).end();
    }
    catch (error) {
        res.status(500).json(error);
    }
});
const getFeedPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield databaseConnection_1.prisma.posts.findMany({
            include: {
                users: true,
            }
        });
        if (posts.length === 0)
            return res.status(404).json({ posts: false });
        return res.status(200).json({ posts });
    }
    catch (error) {
        return res.status(500).json(error);
    }
});
exports.default = {
    getUserPosts,
    createPost,
    deletePost,
    getFeedPosts
};
