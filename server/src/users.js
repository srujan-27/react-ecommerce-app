import { readJsonFile } from './utils.js'

export async function getUserByCredentials(username, passwordHash) {
    const users = await readJsonFile('./data-store/users.json')
    const user = users.find(user => user.username === username && user.passwordHash === passwordHash)
    if (!user) {
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