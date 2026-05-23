import axios from 'axios'

const BACKEND_URL = 'http://localhost:3000'

export async function getProducts() {
    const response = await axios.get(`${BACKEND_URL}/products`)
    return response.data
}

export async function getProductById(id) {
    const response = await axios.get(`${BACKEND_URL}/products/${id}`)
    return response.data
}

export async function login(username, password) {
    const response = await axios.post(`${BACKEND_URL}/login`, { username, password})
    return response.data.token
}

export async function getUser(token) {
    const response = await axios.get(`${BACKEND_URL}/user`, { headers: { token }})
    return response.data
}