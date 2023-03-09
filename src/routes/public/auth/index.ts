import { Request, Response } from 'express'

import { Router } from 'express'
import bcrypt from 'bcrypt'

import User from '../../../models/user'
import verifyMandatoryFields from '../../../utils/verifyMandatoryFields'
import generateToken from '../../../utils/generateToken'
import { v4 as uuidV4 } from 'uuid'

const authRouter = Router()

authRouter.post('/signup', async (req: Request, res: Response) => {
    const { name, email, password } = req.body

    const mandatoryFields = ['name', 'email', 'password']

    const hasMissingMandatoryFields = verifyMandatoryFields(
        mandatoryFields,
        req.body
    )

    if (hasMissingMandatoryFields) {
        return res.status(400).json({
            message: `${hasMissingMandatoryFields} não foi (ram) enviado (s)`,
        })
    }

    const userExists = await User.findOne({ email: email })

    if (userExists) {
        return res.status(422).json({
            message: 'Usuario já cadastrado, por favor, utilize outro e-mail!',
        })
    }

    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password, salt)

    const user = new User({
        id: uuidV4(),
        name,
        email,
        password: passwordHash,
    })

    try {
        await user.save()
        const token = generateToken(user)

        res.status(201).json({
            id: user.id,
            name: user.name,
            token,
        })
    } catch (error) {
        res.status(500).json({ message: error })
    }
})

authRouter.post('/signin', async (req: Request, res: Response) => {
    const { email, password } = req.body

    const mandatoryFields = ['email', 'password']

    const hasMissingMandatoryFields = verifyMandatoryFields(
        mandatoryFields,
        req.body
    )

    if (hasMissingMandatoryFields) {
        return res.status(400).json({
            message: `${hasMissingMandatoryFields} não foi (ram) enviado (s)`,
        })
    }

    const user = await User.findOne({ email: email })

    if (!user) {
        return res.status(400).json({ message: 'Usuário não encontrado!' })
    }

    const passwordIsValid = await bcrypt.compare(
        password,
        user.password as string
    )

    if (!passwordIsValid) {
        return res.status(400).json({ message: 'Usuário não encontrado!' })
    }

    try {
        const token = generateToken(user)
        res.status(200).json({
            id: user.id,
            name: user.name,
            token,
        })
    } catch (error) {
        res.status(500).json({ message: error })
    }
})

export { authRouter }
