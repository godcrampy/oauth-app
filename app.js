var express = require('express')
    app = express()
    authRoutes = require('./routes/auth.routes')
    profileRoutes = require('./routes/profile.routes')
    passportSetup = require('./views/config/passport.setup')
    mongoose = require('mongoose')
    cookieSession = require('cookie-session')
    keys = require('./views/config/keys')
    passport = require('passport')

app.set('view engine', 'ejs')
mongoose.connect('mongodb://localhost/g-auth', { useNewUrlParser: true })
app.use(cookieSession({
    maxAge:24*60*60*1000,
    keys: [keys.session.cookieKey]
}))
//initailize passport
app.use(passport.initialize())
app.use(passport.session())

//==========Listen================================//
app.listen(3000, () => {
    console.log('App listening on port 3000!');
});
//================================================//
//SEtup Routes======================================//
app.use('/auth', authRoutes)
app.use('/profile', profileRoutes)

//============Routes===============================//
app.get('/', (req, res) => {
    res.render('home',{user:req.user})
});
