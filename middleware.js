module.exports.isLoggedIn = (req,res,next) => {
    if(!req.isAuthenticated()){
        //we are adding below line so that to remember from where the login page is being redirected
        req.session.returnTo = req.originalUrl
        req.flash('error','You must be logged in to continue.')
        return res.redirect('/login')
    }
    next()
} 