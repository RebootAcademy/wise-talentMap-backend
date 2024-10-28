const mongoose = require('mongoose')

const locationSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ['Canarias', 'Resto del mundo'],
      required: true,
    },
    island: {
      name: {
        type: String,
        enum: [
          'Tenerife',
          'La Palma',
          'Gran Canaria',
          'Fuerteventura',
          'Lanzarote',
          'La Graciosa',
          'La Gomera',
          'El Hierro',
        ],
        required: function () {
          return this.type === 'Canarias'
        },
      },
      municipality: {
        type: String,
        required: function () {
          return this.type === 'Canarias'
        },
      },
    },
    // Solo para "Resto del mundo"
    counntry: {
      name: {
        type: String,
        required: function () {
          return this.type === 'Resto del mundo'
        },
        default: null,
      },
      city: {
        type: String,
        required: function () {
          return this.type === 'Resto del mundo'
        },
        default: null,
      },
    },
  },
  {
    timestamps: false,
  }
)

const Location = mongoose.model('Location', locationSchema)

module.exports = Location
