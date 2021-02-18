const express = require('express')
const router = express.Router()
const Campground = require('../models/campground')
const catchAsync = require('../utils/catchAsync')
const {isLoggedIn,isAuthor,validateCampground} = require('../middleware')


router.get('/', catchAsync(async (req, res) => {
    const campgrounds = await Campground.find({})
    res.render('campgrounds/index', { campgrounds })
}))
router.get('/new', isLoggedIn, (req, res) => {
    res.render('campgrounds/new')
})
router.post('/', isLoggedIn, validateCampground, catchAsync(async (req, res, next) => {
    const newCamp = await new Campground(req.body)
    newCamp.author = req.user._id
    await newCamp.save()
    req.flash('success','Succesfully made a campground.')
    res.redirect(`/campgrounds/${newCamp._id}`)

}))
router.get('/:id', catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id).populate({
        path:'reviews',
        populate:{
            path:'author'
        }
    }).populate('author')
    if(!campground){
        req.flash('error','Sorry no such campground exist.')
        return res.redirect('/campgrounds');
    }
    res.render('campgrounds/show', { campground })
}))
router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(async (req, res) => {
    const {id} = req.params
    const campground = await Campground.findById(id)
    if(!campground){
        req.flash('error','Sorry no such campground exist.')
        return res.redirect('/campgrounds');
    }
    res.render('campgrounds/edit', { campground })
}))
router.put('/:id', isLoggedIn, isAuthor, validateCampground, catchAsync(async (req, res) => {
    const {id} =req.params
    await Campground.findByIdAndUpdate(id, req.body)
    req.flash('success','Succesfully updated the campground.')
    res.redirect(`/campgrounds/${id}`)
}))
router.delete('/:id', isLoggedIn, isAuthor, catchAsync(async (req, res) => {

    await Campground.findByIdAndDelete(req.params.id)
    req.flash('success','Succesfully deleted  campground.')
    res.redirect('/campgrounds')
}))

module.exports = router;