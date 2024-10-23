import Express from 'express'
import cookieParser from 'cookie-parser'

import { criarTabelas } from './db.js'

import routesClients from './routes/routes_client.js'
import routesAuth from './routes/routes_authentication.js'

const app = Express()
app.use(Express.json())
app.use(cookieParser())

app.use('/client', routesClients)
app.use('/auth', routesAuth)

criarTabelas()

app.listen(8000)