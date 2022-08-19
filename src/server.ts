import express from 'express'
import cors from 'cors'
import 'express-async-errors'
import cookieParser from 'cookie-parser'

import { handleErrorsMiddleware } from './middlewares/handle-errors-middlewares'

import { router } from './routes'

const allowedOrigins = ['http://localhost:3000']

const options: cors.CorsOptions = {
  origin: allowedOrigins,
  credentials: true,
}

const app = express()

app.use(express.json())
app.use(cors(options))
app.use(cookieParser())
app.use(router)

app.use(handleErrorsMiddleware)

app.listen(3333)
