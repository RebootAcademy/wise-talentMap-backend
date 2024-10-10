const router = require('express').Router()
const userRouter = require('./user.routes')
const educationRouter = require('./education.routes')

router.use('/users', userRouter)
router.use('/education', educationRouter)

module.exports = router