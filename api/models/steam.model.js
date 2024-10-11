const mongoose = require('mongoose')

const steamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    enum: ['Ciencia', 'Tecnología', 'Ingenieria', 'Arte', 'Matemáticas'],
    trim: true,
  },
})

const Steam = mongoose.model('Steam', steamSchema)

module.exports = Steam
