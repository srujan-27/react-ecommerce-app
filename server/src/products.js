import { readJsonFile } from './utils.js'


export async function getAll() {
  return await readJsonFile('./data-store/products.json')
}

export async function getById(id) {
  const products = await readJsonFile('./data-store/products.json')
  const product = products.find(product => product.id === id)
  if (!product) {
    return null
  }
  return product
}

