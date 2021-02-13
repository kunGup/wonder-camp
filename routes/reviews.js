const express = require('express')
const router = express.Router({mergeParams: true})
const {reviewSchema} = require('../schemas')
const Campground = require('../models/campground')
const Review = require('../models/reviews')
const catchAsync = require('../utils/catchAsync')
const ExpressError = require('../utils/ExpressError')


const validateReview = (req,res,next)=>{
    const {error} = reviewSchema.validate(req.body)
    if(error){
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg,400)
    }
    else
    next()
}
router.post('/',validateReview, catchAsync(async (req,res)=>{
    const {id} = req.params
    const camp = await Campground.findById(id)
    const review = new Review(req.body.review)
    camp.reviews.push(review)
    await camp.save()
    await review.save()
    req.flash('success','Succesfully posted the review.')
    res.redirect(`/campgrounds/${id}`)
}))
router.delete('/:reviewId',catchAsync(async (req,res)=>{
    const {id,reviewId} = req.params
    await Campground.findByIdAndUpdate(id, {$pull:{reviews:reviewId}})
    await Review.findByIdAndDelete(reviewId)
    req.flash('success','Succesfully deleted the review.')
    res.redirect(`/campgrounds/${id}`)
}))

module.exports = router;