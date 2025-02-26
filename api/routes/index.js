const router = require('express').Router()
const authRouter = require('./auth.routes')
const userRouter = require('./user.routes')
const educationRouter = require('./education.routes')
const locationRouter = require('./location.routes')
const steamRouter = require('./steam.routes')
const sectorRouter = require('./sector.routes')
const companyRouter = require('./company.routes')

router
  .use('/auth', authRouter)
  .use('/users', userRouter)
  .use('/educations', educationRouter)
  .use('/locations', locationRouter)
  .use('/steam', steamRouter)
  .use('/sectors', sectorRouter)
  .use('/companies', companyRouter)
  

module.exports = router