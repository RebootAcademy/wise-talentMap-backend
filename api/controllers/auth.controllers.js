require('dotenv').config()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/user.model')

const signup = async (req, res) => {
  try {
    const user = await User.findOne({email: req.body.email})

    if (user) {
      return res.status(400).json({
        success: false,
        message: 'User already exists'
      })
    }
    const salt = bcrypt.genSaltSync(parseInt(process.env.BCRYPT_SALT) || 10)
    req.body.password = bcrypt.hashSync(req.body.password, salt)
    req.body.role = 'admin'
    const newUser = await User.create(req.body)

    const token = jwt.sign({email: newUser.email}, process.env.JWT_SECRET, {
      expiresIn: '1y'
    })

    res.status(200).json({
      success: true,
      message: 'User created successfully',
      result: {
        user: newUser._doc,
        token: token
      }
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

const login = async (req, res) => {
  try {
    const body = req.body
    const user = await User.findOne({email: body.email})
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      })
    }

    if (user.role !== 'admin') {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized'
      })
    }

    const isMatch = await bcrypt.compare(body.password, user.password)
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      })
    }

    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)
    res.status(200).json({
      success: true,
      description: 'User logged in successfully',
      result: {
        user: user,
        token: token
      }
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error logging in User',
      error: error.message
    })
  }
}

module.exports = {
  signup,
  login
}
