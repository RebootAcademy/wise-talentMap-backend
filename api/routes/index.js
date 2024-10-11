const router = require('express').Router()
const userRouter = require('./user.routes')
const educationRouter = require('./education.routes')
const locationRouter = require('./location.routes')

router
    .use('/users', userRouter)
    .use('/educations', educationRouter)
    .use('/locations', locationRouter)

module.exports = router