const express = require('express')
const router = express.Router()
const passport = require('passport')
const User = require('../models/user')

router.get('/register',(req,res)=>{
    res.render('users/register')
})

router.post('/register',async(req,res)=>{
    try{
        const {email,username,password} = req.body
        const user = new User({email, username})
        const newUser = await User.register(user,password)
        req.login(newUser,err => {
            if(err) return next(err)
            
            req.flash('success','Welcome to the Wonder Camp.')
            res.redirect('/campgrounds')
        })
    }catch(e){
        req.flash('error',e.message)
        res.redirect('/register')
    }

})
router.get('/login',(req,res)=>{
    res.render('users/login')
})
router.post('/login',passport.authenticate('local',{failureFlash:true,failureRedirect:'/login'}),(req,res)=>{
    req.flash('success','welcome back!')
    const redirectUrl = req.session.returnTo || '/campgrounds'
    delete req.session.returnTo
    res.redirect(redirectUrl)

})

router.get('/logout',(req,res)=>{
    req.logout()
    req.flash('success','Good Bye!')
    res.redirect('/campgrounds')
})
module.exports = router