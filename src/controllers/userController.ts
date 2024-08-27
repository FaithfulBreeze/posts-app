import { logEvents } from '../middlewares/logEvents'
import { prisma } from '../services/databaseConnection'
import { Request, Response } from 'express'
import {v4} from 'uuid'
import bcrypt from 'bcrypt'

const createUser = async (req: Request, res: Response): Promise<Response | void> => {
  let user: unknown
  try {
    user = await prisma.users.findFirst({
      where: {
        username: req.body.username
      }
    })
  } catch (error) {
    return res.status(500).json(error)
  }
  if(!user){
    try {
      const id = v4()
      const hashedPassword = bcrypt.hashSync(req.body.password, 10) //Hashing the password before writing to DB
      req.body.password = hashedPassword
      req.body.id = id
      await prisma.users.create({
        data: req.body
      })
      logEvents(`User created id: ${id}.`, 'userEvents.txt')
      return res.status(201).redirect('/login')
    } catch (error) {
      logEvents(`User could not be created.`, 'userEvents.txt')
      return res.status(500).send('Error on creating user.')
    }
  }else{
    logEvents(`User could not be created.`, 'userEvents.txt')
    return res.status(400).send('Username already taken!')
  }
}

const getUserData = async (req: (Request & { user?: any }), res: Response): Promise<Response> => { //user data for frontend
  const { id } = req.params
  try {
    if(id){ //another user
      const user = await prisma.users.findFirst({
        where:{
          id
        },
        select: {
          id: true,
          first_name: true,
          last_name: true,
          username: true
        }
      })
      return res.status(200).json(user)
    }else{ //current user
      const user = await prisma.users.findFirst({
        where: {
          id: req.user.payload
        },
        select: {
          id: true,
          first_name: true,
          last_name: true,
          username: true
        }
      })
      return res.status(200).json(user)
    }
  } catch (error) {
    return res.status(500).json(error)
  }
}

const deleteUser = async (req: (Request & { user?: any }), res: Response): Promise<Response | void> => { //deletes user
  try {
    await prisma.posts.deleteMany({
      where: {
        owner: req.user.payload
      }
    })
    await prisma.users.delete({
      where: {
        id: req.user.payload
      }
    })
    res.clearCookie('jwt') //clears cookie
    return res.status(204).end()
  } catch (error) {
    return res.status(500).json(error)
  }
}

export default { 
  createUser, 
  getUserData, 
  deleteUser 
}