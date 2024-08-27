import { prisma } from '../services/databaseConnection'
import { Request, Response } from 'express'
import {v4} from 'uuid'

const getUserPosts = async (req: (Request & { user?: any}), res: Response): Promise<Response> => { //get user posts
  
  if(req.params.id){ //another user
    try {
      const posts = await prisma.posts.findMany({
        where: {
          owner: req.params.id
        },
        orderBy: {
          post_timestamp: 'desc'
        }
      })
      return res.status(200).json({ posts })
    } catch (error) {
      return res.status(500).json(error)
    }
  }else{ //current user
    try {
      const posts = await prisma.posts.findMany({
        where: {
          owner: req.user.payload
        },
        orderBy: {
          post_timestamp: 'desc'
        }
      })
      return res.status(200).json({ posts })
    } catch (error) {
      return res.status(500).json(error)
    }
  }
}

const createPost = async (req: (Request & { user?: any }), res: Response): Promise<Response | void> => { //creates a new post
  const {post_name, post_content} = req.body
  try {
    await prisma.posts.create({
      data: {
        id: v4(),
        post_name,
        post_content,
        owner: req.user.payload
      }
    })
    res.status(201).redirect('../user/user-page')
  } catch (error) {
    res.status(500).json(error)
  }
}

const deletePost = async (req: (Request & { user?: any }), res: Response): Promise<void> => { //delete a post
  try {
    await prisma.posts.delete({
      where: {
        id: req.params.id,
        owner: req.user.payload
      }
    })
    res.status(204).end()
  } catch (error) {
    res.status(500).json(error)
  }
 }

const getFeedPosts = async (req: Request, res: Response): Promise<Response> => { //gets the feed posts
  try {
    const posts = await prisma.posts.findMany({
      include: {
        users: true,
      }
    })
    if(posts.length === 0) return res.status(404).json({ posts: false })
    return res.status(200).json({ posts })
  } catch (error) {
    return res.status(500).json(error)
  }
}

export default { 
  getUserPosts, 
  createPost, 
  deletePost, 
  getFeedPosts 
}