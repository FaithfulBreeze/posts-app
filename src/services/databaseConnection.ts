import { PrismaClient } from "@prisma/client";
import { app } from '../server'
import { logEvents } from "../middlewares/logEvents";
export const prisma = new PrismaClient()

export const startServer =  async () => {
    try {
        await prisma.$connect()
        app.listen(4040, () => {
            console.log('Server running...')
            logEvents.databaseConnect()
            logEvents.serverStatus()
        })
    } catch (error) {
        logEvents.databaseConnect(error)
        logEvents.serverStatus(error)
    }
}
