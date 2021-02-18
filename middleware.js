const ExpressError = require('./utils/ExpressError')
const {campgroundSchema,reviewSchema} = require('./schemas')
const Campground = require('./models/campground')
const Review = require('./models/reviews')

module.exports.validateReview = (req,res,next)=>{
    const {error} = reviewSchema.validate(req.body)
    if(error){
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg,400)
    }
    else
    next()
}

module.exports.validateCampground = (req,res,next)=>{
    const {error} = campgroundSchema.validate(req.body)
    if(error){
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg,400)
    }
    else
    next()
}
module.exports.isLoggedIn = (req,res,next) => {
    if(!req.isAuthenticated()){
        //we are adding below line so that to remember from where the login page is being redirected
        req.session.returnTo = req.originalUrl
        req.flash('error','You must be logged in to continue.')
        return res.redirect('/login')
    }
    next()
} 
module.exports.isAuthor = async(req,res,next)=>{
    const {id} = req.params
    const campground = await Campground.findById(id)
    if(!campground.author.equals(req.user._id)){
        req.flash('error',`You don't have permission to do so!`)
        return res.redirect(`/campgrounds/${id}`)
    }
    next()
}
module.exports.isReviewAuthor = async(req,res,next)=>{
    const {id,reviewId} = req.params
    const review = await Review.findById(reviewId)
    if(!review.author.equals(req.user._id)){
        req.flash('error',`You don't have permission to do so!`)
        return res.redirect(`/campgrounds/${id}`)
    }
    next()
}