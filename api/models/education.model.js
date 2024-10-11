const mongoose = require('mongoose')

const educationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
      enum: [
        'Formación Profesional',
        'Educación Primaria',
        'Educación Secundaria',
        'Grado Universitario',
        'Posgrado',
        'Doctorado',
      ],
    },
  },
  {
    timestamps: false,
  }
)

const Education = mongoose.model('education', educationSchema)

module.exports = Education