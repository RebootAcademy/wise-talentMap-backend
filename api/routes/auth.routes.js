const router = require('express').Router()
const { signup, login } = require('../controllers/auth.controllers')

router  
    .post('/signup', signup)
    .post('/login', login)

module.exports = router