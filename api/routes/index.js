const router = require('express').Router()
const userRouter = require('./user.routes')
const locationRouter = require('./location.routes')

router
    .use('/users', userRouter)
    .use('/locations', locationRouter)

module.exports = router