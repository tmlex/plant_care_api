const passport = require('passport')
const bcrypt = require('bcryptjs')
const User = require('./models/user')
const LocalStrategy = require('passport-local')
const GoogleStrategy = require('passport-google-oauth20')

function initialize() {

    passport.use(new LocalStrategy(async (username, password, done) => {
        try {
            const user = await User.exists({ username })?.select('+password')
            if (user === null) {
                return done(null, false, { message: "No user with that username" })
            }
            if (await bcrypt.compare(password, user.password)) {
                return done(null, user)
            } else {
                return done(null, false, { message: "Wrong password" })
            }
        } catch (err) {
            return done(err)
        }
    }))

    passport.use(new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: `/api/users/login/google/callback`,
            scope: ['profile', 'email']
        },
        async function(accessToken, refreshToken, profile, cb) {
            try {
                let user = await User.exists({ googleId: profile.id }).select('+username')
                if (user === null) {
                    user = await User.create({ googleId: profile.id, username: profile.displayName, email: profile.emails[0].value })
                }
                cb(null, user)
            } catch (err) {
                cb(err)
            }
        }
    ))

    passport.serializeUser((user, done) => {
        done(null, user)
    })
    
    passport.deserializeUser((user, done) => {
        done(null, user)
    }) 
}

module.exports = initialize