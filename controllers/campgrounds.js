const Campground = require("../models/campground")
module.exports.renderIndex = async (req, res) => {
    const campgrounds = await Campground.find({})
    res.render('campgrounds/index', { campgrounds })
}

module.exports.renderNewForm = (req, res) => {
    res.render('campgrounds/new')
}

module.exports.createCampground = async (req, res, next) => {
    const newCamp = await new Campground(req.body)
    newCamp.author = req.user._id
    await newCamp.save()
    req.flash('success','Succesfully made a campground.')
    res.redirect(`/campgrounds/${newCamp._id}`)

}

module.exports.renderShowPage = async (req, res) => {
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
}

module.exports.renderEditPage = async (req, res) => {
    const {id} = req.params
    const campground = await Campground.findById(id)
    if(!campground){
        req.flash('error','Sorry no such campground exist.')
        return res.redirect('/campgrounds');
    }
    res.render('campgrounds/edit', { campground })
}

module.exports.updateCampground = async (req, res) => {
    const {id} =req.params
    await Campground.findByIdAndUpdate(id, req.body)
    req.flash('success','Succesfully updated the campground.')
    res.redirect(`/campgrounds/${id}`)
}

module.exports.deleteCampground = async (req, res) => {

    await Campground.findByIdAndDelete(req.params.id)
    req.flash('success','Succesfully deleted  campground.')
    res.redirect('/campgrounds')
}