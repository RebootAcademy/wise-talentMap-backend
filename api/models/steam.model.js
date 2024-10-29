const mongoose = require('mongoose')

const steamSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      enum: ['Ciencia', 'Tecnología', 'Ingeniería', 'Arte', 'Matemáticas'],
      trim: true,
    },
  },
  {
    timestamps: false
  }
)

const Steam = mongoose.model('steam', steamSchema)

module.exports = Steam
