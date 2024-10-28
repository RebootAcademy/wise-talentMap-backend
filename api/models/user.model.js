const {ObjectId} = require('mongodb')
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    //required: true,
  },
  lastName: {
    type: String,
    //required: true,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  email: {
    type: String,
    unique: true,
    //required: true,
  },
  steam: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'steam',
    },
  ],
  sectors: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'sector',
    },
  ],
  phoneNumber: {
    type: String,
    //required: true,
  },
  company: {
    /* type: mongoose.Schema.Types.ObjectId,
    ref: 'company' */
    type: String,
  },
  birthday: {
    type: Date,
    //required: true,
  },
  jobPosition: {
    type: String,
    //required: true,
  },
  bio: {
    type: String,
  },
  linkedin: {
    type: String,
  },
  partner: {
    type: Boolean,
    default: false,
  },
  acceptNewsLetter: {
    type: Boolean,
    default: false,
  },
  image: {
    type: String,
  },
  educationalLevel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'education',
  },
  educationalDescription: {
    type: String,
  },
  location: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'location',
  },
})

const User = mongoose.model('User', userSchema)
module.exports = User
