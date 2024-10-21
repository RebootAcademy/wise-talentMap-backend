const mongoose = require('mongoose')

const steamSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      enum: ['Ciencia', 'Tecnología', 'Ingenieria', 'Arte', 'Matemáticas'],
      trim: true,
    },
  },
  {
    timestamps: false
  }
)

const Steam = mongoose.model('Steam', steamSchema)

module.exports = Steam
