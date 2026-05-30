import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import * as productsData from './products.js'
import { formatAjvValidationErrors, getLoginRequestValidator } from './schema.js'
import { getUserByCredentials, getUserById } from './users.js'
import { createAuthToken, validateAuthToken } from './auth.js'
import { InvalidAuthTokenError } from './errors.js'
import cartRoutes from './cart.js'


dotenv.config()

const app = express()
const port = 3000

const main = async () => {
  await initializeServer()
}

const initializeServer = async () => {
  console.log('Initializing Express Server...')
  
  // middleware to parse json
  app.use(express.json()); 

  console.log('Configuring CORS...')
  app.use(cors({
    origin: ['http://127.0.0.1:5173', 'http://localhost:5173']
  }))

  function logError(err) {
    if (err instanceof Error) {
      console.error(`${err.message}\n\n${err.stack}`)
    }
    else {
      console.error(`ERROR: ${err}`)
    }
  }

  console.log('Defining endpoint GET /products')
  app.get('/products', async (req, res) => {
    try {
      const products = await productsData.getAll()
      return res.status(200).json(products)
    }
    catch(err) {
      logError(err)
      return res.status(500).json({ error: 'Unable to get all products due to interal server error' })
    }
  })
  
  console.log('Defining endpoint GET /products/:id')
  app.get('/products/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id, 10)
      const product = await productsData.getById(id)
      if (!product) {
        return res.status(404).json({ error: `Product with id ${id} not found` })
      }
      return res.status(200).json(product)
    }
    catch(err) {
      logError(err)
      return res.status(500).json({ error: 'Unable to get product due to interal server error' })
    }
  })

  console.log('Defining endpoint POST /login')
  app.post('/login', async (req, res) => {
    try {
      const validator = getLoginRequestValidator()
      if (!validator(req.body)) {
        return res.status(400).json({ error: 'malformed/invalid request body', message: formatAjvValidationErrors(validator.errors) })
      }
      const body = req.body
      const user = await getUserByCredentials(body.username, body.password)
      if (!user) {
        return res.status(401).json({ error: 'Unauthorized' })
      }
      const authToken = createAuthToken({ id: user.id })
      return res.status(201).json({ token: authToken })
    }
    catch(err) {
      logError(err)
      return res.status(500).json({ error: 'Unable to complete login due to interal server error' })
    }
  })

  console.log('Defining endpoint GET /user')
  app.get('/user', async (req, res) => {
    try {
      if (!req.headers.token) {
        return res.status(401).json({ error: 'Unauthorized' })
      }
      const token = req.headers.token
      const payload = validateAuthToken(token)
      const user = await getUserById(payload.id)
      if (!user) {
        return res.status(401).json({ error: 'Unauthorized' })
      }
      const userResponse = {
        id: user.id, 
        username: user.username, 
        firstName: user.firstName, 
        lastName: user.lastName 
      }
      return res.status(200).json(userResponse)

    }
    catch(err) {
      if (err instanceof InvalidAuthTokenError) {
        return res.status(401).json({ error: 'Unauthorized' })
      }
      logError(err)
      return res.status(500).json({ error: 'Unable to get user info due to interal server error' })
    }  
  })

  console.log('Defining endpoint /cart')
  app.use('/cart', cartRoutes)

  
  // start express server
  app.listen(port, () => {
    console.log(`Listening on port ${port}`)
  })

  console.log('Express Server Initialized!')
}

main()


