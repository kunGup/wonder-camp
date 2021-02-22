const mongoose = require('mongoose')
const Review = require('./reviews')
const Schema = mongoose.Schema
const User = require('./user')

const ImageSchema = new Schema({
    url: String,
    filename: String
});

ImageSchema.virtual('thumbnail').get(function () {
    return this.url.replace('/upload', '/upload/w_200');
});

const opts = { toJSON: { virtuals: true } };

const CampgroundSchema = new Schema({
    title: String,
    price: Number,
    images: [ImageSchema],
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
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
},opts)
CampgroundSchema.virtual('properties.popUpMark').get(function () {
    return `<strong><a style="text-decoration:none" href="/campgrounds/${this._id}"><h4>${this.title}</h4></a></strong>
    <p>${this.location.substring(0,20)}..</p>`;
});


CampgroundSchema.post('findOneAndDelete', async function (camp) {
    if (camp.reviews.length) {
        await Review.deleteMany({ _id: { $in: camp.reviews } })
    }
})
module.exports = new mongoose.model('Campground',CampgroundSchema)