const mongoose = require('mongoose')

const companySchema = new mongoose.Schema({
    name: {
        type: String,
        //required: true,
        unique: true,
    },
    email: {
        type: String,
        //required: true,
        // unique:true
        
    },
    website:{
        type: String,
        //required: true,
        // unique:true
    },
    phone: {
        type: String,
    },
    location: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'location',
    }
})

const Company = mongoose.model('company', companySchema)

module.exports = Company