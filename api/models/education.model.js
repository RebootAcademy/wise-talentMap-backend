const mongoose = require('mongoose')

const educationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
    
})

const Education = mongoose.model('education', educationSchema)

module.exports = Education