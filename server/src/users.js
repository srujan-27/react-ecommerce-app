

import bcrypt from 'bcrypt'
import { readJsonFile } from './utils.js'

export async function getUserByCredentials(username, password) {
    const users = await readJsonFile('./data-store/users.json')
    const user = users.find(user => user.username === username)
    if (!user) {
        return null
    }
    const passwordMatches = await bcrypt.compare(password, user.passwordHash)
    if (!passwordMatches) {
        return null
    }
    return user
}

export async function getUserById(id) {
    const users = await readJsonFile('./data-store/users.json')
    const user = users.find(user => user.id === id)
    if (!user) {
        return null
    }
    return user
}