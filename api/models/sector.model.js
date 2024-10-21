const mongoose = require('mongoose')

const sectorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      enum: [
        'Institución educativa',
        'Empresa pública',
        'Empresa privada',
        'Autónoma',
      ],
    },
  },
  {
    timestamps: false,
  }
)  

const Sector = mongoose.model('sector', sectorSchema)

module.exports = Sector