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
  email: {
    type: String,
    //required: true,
  },
  phoneNumber: {
    type: String,
    //required: true,
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
  partner:{
    type: Boolean,
    default: false
  },
  acceptNewsLetter: {
    type: Boolean,
    default: false
  },
  image:{
    type: String
  },
  educationalLevel: {
    type: String, //Is ObjectId type
    //required: true,
  },
  educationalDescription:{
    type: String,
  },
  location: {
    type: String, //Is ObjectId type
  }
})


const User = mongoose.model('User', userSchema) 
module.exports = User