const mongoose = require('mongoose')

const Schema = mongoose.Schema

const cryptoSchema = new Schema ({
    token: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        require: true
    },
    //16.a. Assigningworkouts to users
    user_id: {
        type: String,
        required: true
    }
},{timestamps: true})

module.exports = mongoose.model('CryptoTransaction', cryptoSchema)