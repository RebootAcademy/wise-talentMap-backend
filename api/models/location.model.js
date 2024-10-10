const mongoose = require('mongoose')

const locationSchema = new mongoose.Schema({
    name: {
        type: String,
        enum: ['Canarias', 'Resto del mundo'],
    },
    
})

const location = mongoose.model('location', locationSchema)

module.exports = location