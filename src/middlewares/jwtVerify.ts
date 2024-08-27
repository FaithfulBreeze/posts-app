import jwt, { GetPublicKeyOrSecret, JwtPayload, Secret } from 'jsonwebtoken'
import dotenv from 'dotenv'
import { prisma } from '../services/databaseConnection'
import { Request, Response, NextFunction} from 'express'
dotenv.config()

export const jwtVerify = (req: Request & { user?: any }, res: Response, next: NextFunction)=>{
  const cookies = req.cookies //get cookies!
  
  if(!cookies.jwt) return res.status(401).send('Unauthorized') //no jwt cookie
  
  jwt.verify(cookies.jwt, process.env.TOKEN_SECRET as Secret, async (err: any, user: any)=>{ //is the token valid?

    if(err || !user) return res.status(403).send('Unauthorized') //no

    user = user as JwtPayload

    const data = await prisma.users.findFirst({
      where: {
        id: user.payload
      },
      select: {
        refresh_token: true
      }
    })

    if(!data) return res.status(404).json({ message: "Resource not found." })
    
    if(data.refresh_token == cookies.jwt){
      req.user = user
      next()
    }else{ //no
      res.status(401).send('Unauthorized')
    }
  })
}
