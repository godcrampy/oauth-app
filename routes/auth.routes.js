var router = require('express').Router()
    passport = require('passport')

app.set('view engine', 'ejs')
//=======Login Page=====================//
router.get('/login', (req,res)=>{
    res.render('login',{user:req.user})
})
//=====================================//
//======Passport=======================//
router.get('/google', passport.authenticate('google', {
    scope : ['profile']
}))
//=====================================//
//========Logout=======================//
router.get('/logout', (req, res)=>{
    req.logout()
    res.redirect('/')
})
//======================================//
//==Redirect from google=================//
router.get('/google/redirect',/* Passport Middleware */ passport.authenticate('google'), (req,res)=>{
    // res.send(req.user);
    res.redirect('/profile')
})

module.exports = router;