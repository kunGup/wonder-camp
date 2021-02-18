const mongoose = require('mongoose')
const {Schema} = mongoose
const reviewSchema = Schema({
    body: String,
    rating: Number,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})
const Review = mongoose.model('Review',reviewSchema)
reviewSchema.post('findOneAndDelete', async function (camp) {
    if (camp.reviews.length) {
        const res = await Product.deleteMany({ _id: { $in: farm.products } })
        console.log(res);
    }
    // console.log(farm);
})
module.exports = Review
