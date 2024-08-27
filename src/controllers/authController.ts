import { logEvents } from '../middlewares/logEvents'
import { prisma } from '../services/databaseConnection'
import { Request, Response } from 'express'
import dotenv from 'dotenv'
import jwt, { Secret } from 'jsonwebtoken'
import bcrypt from 'bcrypt'
dotenv.config()

const logUser = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const requestedUser = req.body

    const user = await prisma.users.findFirst({
      where: {
        username: requestedUser.username
      }
    })

    if(!user) return res.status(404).send('User not found.')

    if(bcrypt.compareSync(requestedUser.password, user.password) == false)
      return res.status(400).send('Wrong password.')

    logEvents(`User logged id: ${user.id}.`, 'userEvents.txt')
    const token = jwt.sign( //generating jwt for user
      { payload: user.id },
      process.env.TOKEN_SECRET as Secret,
      { expiresIn: '12h' }
    )

    await prisma.users.update({
      where:{
        id: user.id
      },
      data: {
        refresh_token: token
      }
    })

    logEvents(`Token generated for user: ${user.id}\nToken: ${token}\n`, 'tokensHistory.txt')
    
    res.cookie( //sets jwt as cookie on browser
      'jwt',
      token,
      {
        httpOnly: true,
        maxAge: 1000 * 60 * 60
      }
    )

    return res.status(301).redirect(`../user/${user.username}`) //Redirecting for user page

  } catch (error) {
    return res.status(500).json(error)
  }
}

const logoutUser = async (req: (Request & { user?: any }), res: Response): Promise<Response | void> => {
  try {
    await prisma.users.update({
      where:{
        id: req.user.payload
      },
      data: {
        refresh_token: null
      }
    })

    logEvents(`Token deleted for user: ${req.user.payload}\nToken: ${req.cookies.jwt}\n`, 'tokensHistory.txt')
    logEvents(`User logged off id: ${req.user.payload}.`, 'userEvents.txt')
    return res.status(204).clearCookie('jwt').end() //Clears cookie
  } catch (error) {
    return res.status(500).json(error)
  }
}

export default {
  logUser,
  logoutUser
}