const mongoose = require('mongoose')

const researchSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      enum: ['Teacher', 'Research']
    }
  },
  {
    timestamps: false,
  }
)

const Research = mongoose.model('Research', researchSchema)

module.exports = Research
