import { Request, Response } from 'express'

import { Router } from 'express'

import Words from '../../../models/words'
import User from '../../../models/user'

import freeDictionaryAPIConsult from '../../../services/freeApiSearch'
import createPagination, {
    minLimit,
    minPage,
} from '../../../utils/createPagination'

import { ICustomRequest } from '../../../middlewares/verifyToken'
import { redisClient } from '../../..'
import {
    createStringRedis,
    redisSetListFormatter,
} from '../../../utils/redisListFormatter'
import { getStaticList } from '../../../utils/getStaticList'

const entriesRouter = Router()

entriesRouter.get('/en', async (req: Request, res: Response) => {
    const { search, limit, page } = req.query

    const limitNumbered = Number(limit)
    const pageNumbered = Number(page)
    const searchTerm = search?.toString() || ''

    const startTime = Date.now()
    const redisRequest = await redisClient.get(
        createStringRedis(
            limitNumbered || minLimit,
            pageNumbered || minPage,
            searchTerm
        )
    )
    const endTime = Date.now()

    if (redisRequest) {
        return res
            .status(200)
            .header({
                'x-cache': 'HIT',
                'x-response-time': `${endTime - startTime}ms`,
            })
            .json(JSON.parse(redisRequest))
    } else {
        try {
            const allWords =
                getStaticList() || {
                    list: await redisClient.get('wordsList'),
                } ||
                (await Words.findOne())

            const words = allWords?.list?.split('&') || []

            const filteredWords = words.filter((word) =>
                word.toLowerCase().startsWith(searchTerm.toLowerCase())
            )

            return res
                .status(200)
                .header({
                    'x-cache': 'MISS',
                })
                .json(
                    createPagination(
                        filteredWords,
                        limitNumbered,
                        pageNumbered,
                        searchTerm
                    )
                )
        } catch (error) {
            return res
                .status(400)
                .json({ message: 'Não foi possivel exibir a lista' })
        }
    }
})

entriesRouter.get('/en/:word', async (req: ICustomRequest, res: Response) => {
    const searchedWord = req?.params?.word

    const startTime = Date.now()
    const redisRequest = await redisClient.get(searchedWord)
    const endTime = Date.now()

    if (redisRequest) {
        return res
            .status(200)
            .header({
                'x-cache': 'HIT',
                'x-response-time': `${endTime - startTime}ms`,
            })
            .json(JSON.parse(redisRequest))
    } else {
        try {
            const wordDetails = await freeDictionaryAPIConsult(searchedWord)

            redisSetListFormatter(wordDetails, searchedWord)

            await User.updateOne(
                {
                    id: req.userId,
                    'wordsHistory.word': { $ne: searchedWord },
                },
                {
                    $push: {
                        wordsHistory: {
                            word: searchedWord,
                            createdAt: new Date(),
                        },
                    },
                }
            )

            return res
                .status(200)
                .header({
                    'x-cache': 'MISS',
                })
                .json(wordDetails)
        } catch (error: any) {
            return res.status(400).json({ message: error.message })
        }
    }
})

entriesRouter.post(
    '/en/:word/favorite',
    async (req: ICustomRequest, res: Response) => {
        const searchedWord = req?.params?.word

        try {
            await freeDictionaryAPIConsult(searchedWord)

            await User.updateOne(
                {
                    id: req.userId,
                    'favoritesWords.word': { $ne: searchedWord },
                },
                {
                    $push: {
                        favoritesWords: {
                            word: searchedWord,
                            createdAt: new Date(),
                        },
                    },
                }
            )

            return res.status(200).json({
                message: 'Palavra adicionada aos favoritos com sucesso',
            })
        } catch (error: any) {
            return res.status(400).json({
                message: `${error.message}. Impossivel concluir o a açao `,
            })
        }
    }
)

entriesRouter.delete(
    '/en/:word/unfavorite',
    async (req: ICustomRequest, res: Response) => {
        const searchedWord = req?.params?.word

        try {
            await freeDictionaryAPIConsult(searchedWord)

            await User.updateOne(
                {
                    id: req.userId,
                },
                {
                    $pull: {
                        favoritesWords: {
                            word: searchedWord,
                        },
                    },
                }
            )

            return res.status(200).json({
                message: 'Palavra removida dos favoritos com sucesso',
            })
        } catch (error: any) {
            return res.status(400).json({
                message: `${error.message}. Impossivel concluir o a açao `,
            })
        }
    }
)

export default entriesRouter
