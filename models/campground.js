const mongoose = require('mongoose')
const Schema = mongoose.Schema
const CampgroundSchema = new Schema({
    title: String,
    price: Number,
    img: String,
    description: String,
    location: String
})

module.exports = new mongoose.model('Campground',CampgroundSchema)