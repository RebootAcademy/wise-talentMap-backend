const router = require('express').Router()
const userRouter = require('./user.routes')
const educationRouter = require('./education.routes')
const locationRouter = require('./location.routes')
const steamRouter = require('./steam.routes')

router
  .use('/users', userRouter)
  .use('/educations', educationRouter)
  .use('/locations', locationRouter)
  .use('/steam', steamRouter)

module.exports = router