const mongoose = require('mongoose')
const Review = require('./reviews')
const Schema = mongoose.Schema
const User = require('./user')
const CampgroundSchema = new Schema({
    title: String,
    price: Number,
    img: String,
    description: String,
    location: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
})
CampgroundSchema.post('findOneAndDelete', async function (camp) {
    if (camp.reviews.length) {
        await Review.deleteMany({ _id: { $in: camp.reviews } })
    }
})
module.exports = new mongoose.model('Campground',CampgroundSchema)