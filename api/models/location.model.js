const mongoose = require('mongoose')

const locationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      enum: ['Canarias', 'Resto del mundo'],
    },
  },
  {
    timestamps: false,
  }
)

const location = mongoose.model('location', locationSchema)

module.exports = location