import { NextFunction, Request, Response } from 'express'

import jwt from 'jsonwebtoken'
import User from '../models/user'

export interface ICustomRequest extends Request {
    userId?: string
    userEmail?: string
}

const verifyTokenMiddleware = async (
    req: ICustomRequest,
    res: Response,
    next: NextFunction
) => {
    const secret = process.env.SECRET as string

    const authHeader = req && req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (!token)
        return res && res.status(401).json({ message: 'Não Authorizado' })

    try {
        const decryptedToken = jwt.verify(token, secret)

        if (typeof decryptedToken !== 'string') {
            const userExists = await User.findOne({ id: decryptedToken.id })

            if (!userExists)
                return (
                    res && res.status(401).json({ message: 'Não Authorizado' })
                )

            req.userId = decryptedToken.id
            req.userEmail = decryptedToken.email
        }

        next()
    } catch (err) {
        res && res.status(400).json({ message: 'Token Inválido' })
    }
}

export default verifyTokenMiddleware
