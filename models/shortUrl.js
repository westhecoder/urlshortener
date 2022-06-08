const mongoose = require('mongoose')
const shortID = require('shortID')


const shortUrlSchema = new mongoose.Schema({
    full: {
        type: String,
        required: true,
    },
    short: {
        type: String,
        required: true,
        default: shortID.generate
    }, 
    clicks: {
        type: Number,
        required: true,
        default: 0
    }

    /* 
    In Postgres
    CREATE DATABASE urlShortner, 
    
    */
})

module.exports = mongoose.model('shortUrl', shortUrlSchema)