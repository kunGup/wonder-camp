const Campground = require('../models/campground')
const Review = require('../models/reviews')

module.exports.postReview = async (req,res)=>{
    const {id} = req.params
    const camp = await Campground.findById(id)
    const review = new Review(req.body.review)
    review.author = req.user._id;
    camp.reviews.push(review)
    await camp.save()
    await review.save()
    req.flash('success','Succesfully posted the review.')
    res.redirect(`/campgrounds/${id}`)
}

module.exports.deleteReview = async (req,res)=>{
    const {id,reviewId} = req.params
    await Campground.findByIdAndUpdate(id, {$pull:{reviews:reviewId}})
    await Review.findByIdAndDelete(reviewId)
    req.flash('success','Succesfully deleted the review.')
    res.redirect(`/campgrounds/${id}`)
}