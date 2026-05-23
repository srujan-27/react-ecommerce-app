import jwt from 'jsonwebtoken'
import { InvalidAuthTokenError } from './errors.js'

export function createAuthToken(payload) {
    return jwt.sign(payload, process.env.SECRET_KEY)
}

export function validateAuthToken(token) {
    try {
        return jwt.verify(token, process.env.SECRET_KEY)
    }
    catch (err) {
        throw new InvalidAuthTokenError()
    }
}