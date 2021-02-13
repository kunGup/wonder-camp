const express = require('express')
const router = express.Router()
const {campgroundSchema} = require('../schemas')
const Campground = require('../models/campground')
const catchAsync = require('../utils/catchAsync')
const ExpressError = require('../utils/ExpressError')

const validateCampground = (req,res,next)=>{
    const {error} = campgroundSchema.validate(req.body)
    if(error){
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg,400)
    }
    else
    next()
}

router.get('/', catchAsync(async (req, res) => {
    const campgrounds = await Campground.find({})
    res.render('campgrounds/index', { campgrounds })
}))
router.get('/new', (req, res) => {
    res.render('campgrounds/new')
})
router.post('/', validateCampground, catchAsync(async (req, res, next) => {
    const newCamp = await new Campground(req.body)
    await newCamp.save()
    req.flash('success','Succesfully made a campground.')
    res.redirect(`/campgrounds/${newCamp._id}`)

}))
router.get('/:id', catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id).populate('reviews')
    if(!campground){
        req.flash('error','Sorry no such campground exist.')
        return res.redirect('/campgrounds');
    }
    res.render('campgrounds/show', { campground })
}))
router.get('/:id/edit', catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id)
    if(!campground){
        req.flash('error','Sorry no such campground exist.')
        return res.redirect('/campgrounds');
    }
    res.render('campgrounds/edit', { campground })
}))
router.put('/:id', validateCampground, catchAsync(async (req, res) => {
    await Campground.findByIdAndUpdate(req.params.id, req.body)
    req.flash('success','Succesfully updated the campground.')
    res.redirect('/campgrounds')
}))
router.delete('/:id', catchAsync(async (req, res) => {

    await Campground.findByIdAndDelete(req.params.id)
    req.flash('success','Succesfully deleted  campground.')
    res.redirect('/campgrounds')
}))

module.exports = router;