require('dotenv').config()

import mongoose from 'mongoose'

import { createLogger, format, transports } from 'winston'

import express, { Request, Response } from 'express'
import cors from 'cors'

import { fetch } from 'cross-fetch'
import { router } from './routes'

import swaggerUi from 'swagger-ui-express'
import swaggerDocument from './swagger.json'

import { createClient } from 'redis'

import Words from './models/words'
import { getStaticList } from './utils/getStaticList'

const port = process.env.PORT || 3001
const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASSWORD
const dbName = process.env.DB_NAME

const app = express()

const redisClient = createClient({
    url: process.env.REDIS_URL,
})

redisClient.on('connect', async () => {
    try {
        await redisClient.flushAll()
        logger.info('Redis Client Connected asd Flushed')
    } catch (err) {
        logger.error('Redis Client Error', err)
    }
})

redisClient.on('error', (err) => logger.error('Redis Client Error', err))

redisClient.connect()

const logger = createLogger({
    format: format.combine(format.splat(), format.simple()),
    transports: [new transports.Console()],
})

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.get('/', async (req: Request, res: Response) => {
    return res.json({ message: 'Fullstack Challenge 🏅 - Dictionary' })
})

app.use(router)

mongoose.set('strictQuery', true)
mongoose
    .connect(process.env.MONGO_URL || '')
    .then(async () => {
        logger.info('MongoDB Connected')

        const redisList = await redisClient.get('wordsList')
        const mongoDbList = await Words.findOne()

        if (!mongoDbList?.list || !redisList) {
            const staticList = getStaticList()
            if (staticList) {
                logger.info('Getting words from static list')
                const wordsDB = new Words(staticList)
                wordsDB.save()
                logger.info('Database is populated with static list ')
                await redisClient.set('wordsList', staticList.list)
                logger.info('RedisList is populated with static list')
            } else {
                fetch(
                    'https://raw.githubusercontent.com/meetDeveloper/freeDictionaryAPI/master/meta/wordList/english.txt'
                ).then((response) => {
                    response.text().then(async (text) => {
                        console.log(
                            '🚀 ~ file: index.ts:98 ~ response.text ~ text:',
                            text
                        )
                        console.log(
                            '🚀 ~ file: index.ts:98 ~ response.text ~ text:',
                            typeof text
                        )

                        logger.info('Getting words from github list')

                        if (!text) return

                        const words = text.replaceAll('\n', '&')

                        await redisClient.set('wordsList', words)
                        logger.info('RedisList is populated with github list')

                        const wordsDB = new Words({ list: words })
                        wordsDB.save()
                        logger.info('WordsDB is populated with github list')
                    })
                })
            }
        }
    })
    .catch((err) => console.log(err))

app.listen(port, () => {
    logger.info('Server is running')
})

export { app, redisClient }
