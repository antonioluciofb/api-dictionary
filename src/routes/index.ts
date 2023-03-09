import { Router } from 'express'
import verifyTokenMiddleware from '../middlewares/verifyToken'

import userRouter from './private/user'
import entriesRouter from './private/entries'

import { authRouter } from './public/auth'

const router = Router()

// public routes
router.use('/auth', authRouter)

// private routes
router.use('/user', verifyTokenMiddleware, userRouter)
router.use('/entries', verifyTokenMiddleware, entriesRouter)

export { router }
