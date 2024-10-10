require('dotenv').config()

const morgan = require('morgan')
const cors = require('cors')
const express = require('express')
const dbConnect = require('./db')

const app = express()

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use('/api', require('./api/routes/index'))

app.listen(process.env.PORT, async (err) => {
  if (err)
    throw new Error(`ERROR: Cannot start Express on PORT ${process.env.PORT}`)
  await dbConnect()

  console.info(`WISE API running on PORT ${process.env.PORT}`)
})
