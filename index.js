require('dotenv').config()

const morgan = require('morgan')
const cors = require('cors')
const express = require('express')
const dbConnect = require('./db')

const app = express()
const http = require('http')

const server = http.createServer(app)

//const WEBSOCKET_PORT = process.env.WEBSOCKET_PORT || 8080;
//startWebSocketServer(WEBSOCKET_PORT);

app.use(cors())
app.use(morgan('dev'))
app.use('/api', require('./api/routes/index'))

server.listen(process.env.PORT, async (err) => {
  if (err)
    throw new Error(`ERROR: Cannot start Express on PORT ${process.env.PORT}`)
  await dbConnect()

  console.info(`WISE API running on PORT ${process.env.PORT}`)
})
