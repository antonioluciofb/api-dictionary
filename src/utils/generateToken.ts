import jwt from 'jsonwebtoken'

import { IPayloadToken } from '../interfaces/utils'

const generateToken = ({ id, name, email }: IPayloadToken) => {
    const secret = process.env.SECRET as string
    return jwt.sign(
        {
            id: id,
            name,
            email,
        },
        secret
    )
}

export default generateToken
