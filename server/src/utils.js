import { promises as fs } from 'fs'
import { validateAuthToken } from './auth.js'
import path from 'path'

const USERS_PATH = path.resolve('./data-store/users.json')

export async function readJsonFile(filePath) {
  const jsonData = await fs.readFile(filePath, 'utf-8')
  return JSON.parse(jsonData)
}

export async function writeJsonFile(filePath, data) {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2))
}

export async function getUserFromToken(token) {
  try {
    const payload = validateAuthToken(token) // gets { id: 1 }
    const users = await readJsonFile(USERS_PATH)
    return users.find(u => u.id === payload.id)
  } catch (err) {
    return null
  }
}
