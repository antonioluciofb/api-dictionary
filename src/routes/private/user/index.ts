import { Request, Response } from 'express'

import { Router } from 'express'

import User from '../../../models/user'
import { ICustomRequest } from '../../../middlewares/verifyToken'
import verifyMandatoryFields from '../../../utils/verifyMandatoryFields'
import createPagination from '../../../utils/createPagination'

const userRouter = Router()

userRouter.get('/me', async (req: ICustomRequest, res: Response) => {
    const user = await User.findOne(
        { id: req.userId },
        { password: 0, __v: 0, _id: 0 }
    )

    return res.status(200).json({
        ...user?.toObject(),
        wordsHistory: user?.wordsHistory?.length,
        favoritesWords: user?.favoritesWords?.length,
    })
})

userRouter.get('/me/history', async (req: ICustomRequest, res: Response) => {
    const { search, limit, page } = req.query

    const limitNumbered = Number(limit)
    const pageNumbered = Number(page)
    const searchTerm = search?.toString() || ''

    const user = await User.findOne(
        { id: req.userId },
        { password: 0, __v: 0, _id: 0 }
    )

    const filteredWords =
        user?.wordsHistory.filter((historyWord: any) =>
            historyWord.word.toLowerCase().startsWith(searchTerm.toLowerCase())
        ) || []

    return res
        .status(200)
        .json(createPagination(filteredWords, limitNumbered, pageNumbered))
})

userRouter.get('/me/favorites', async (req: ICustomRequest, res: Response) => {
    const { search, limit, page } = req.query

    const limitNumbered = Number(limit)
    const pageNumbered = Number(page)
    const searchTerm = search?.toString() || ''

    const user = await User.findOne(
        { id: req.userId },
        { password: 0, __v: 0, _id: 0 }
    )

    const filteredWords =
        user?.favoritesWords.filter((historyWord: any) =>
            historyWord.word.toLowerCase().startsWith(searchTerm.toLowerCase())
        ) || []

    return res
        .status(200)
        .json(createPagination(filteredWords, limitNumbered, pageNumbered))
})

userRouter.delete('/me', async (req: ICustomRequest, res: Response) => {
    const { userEmail } = req

    try {
        await User.findOneAndDelete({ email: userEmail })
        res.status(200).json({ message: 'Usuário deletado com sucesso!' })
    } catch (error) {
        res.status(500).json({ message: error })
    }
})

export default userRouter
