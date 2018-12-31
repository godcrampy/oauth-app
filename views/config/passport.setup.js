var passport = require('passport')
googleStrategy = require('passport-google-oauth2')
keys = require('./keys')
User = require('../../models/user.models')

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user)
    })
})


passport.use(new googleStrategy({
    //options for strategy
    callbackURL: '/auth/google/redirect',
    clientID: keys.google.clientId,
    clientSecret: keys.google.clientSecret
}, (accessToken, refreshToken, profile, done) => {
    //passport callback function
    User.findOne({
        googleId: profile.id
    }).then((currentUser) => {
        if (currentUser) {
            // console.log('user already exists :' + currentUser)
            return done(null, currentUser)
        } else {
            new User({
                username: profile.displayName,
                googleId: profile.id,
                thumbnail: profile._json.image.url
            }).save().then((newUser) => {
                // console.log('new user created: ' + newUser)
                return done(null, newUser)
            })

        }
    })

}))