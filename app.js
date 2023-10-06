require('dotenv').config()

const express = require('express')
const cors = require('cors')
const session = require('cookie-session')
const flash = require('express-flash')
const passport = require('passport')

const port = process.env.PORT || 3000
const app = express()

app.enable('trust proxy')

app.use(flash())
app.use(express.json())

app.use(cors({
  origin: [ 
    process.env.API_BASE_URL,
    process.env.APP_BASE_URL
  ],
  credentials: true
}))


// Initialize session

app.use(session({
  name: 'session',
  keys: [process.env.SESSION_KEY],
  maxAge: 24 * 60 * 60 * 1000,
  secure: process.env.NODE_ENV === 'development' ? false : true,
  httpOnly: process.env.NODE_ENV === 'development' ? false : true,
  sameSite: process.env.NODE_ENV === 'development' ? false : 'none'
}))


// Register regenerate & save after the cookieSession middleware initialization

app.use(function(req, res, next) {
  if (req.session && !req.session.regenerate) {
    req.session.regenerate = (cb) => {
      cb()
    }
  }
  if (req.session && !req.session.save) {
    req.session.save = (cb) => {
      cb()
    }
  }
  next()
})


// Configure passport

require('./passport-config')()
app.use(passport.session())


// Connect Mongo

const mongoose = require('mongoose')
mongoose.connect(process.env.MONGO_URI)
mongoose.connection.on('error', (err) => console.log(err))


// Set routes

app.use('/api/plants', require('./routes/plants'))
app.use('/api/users', require('./routes/users'))
app.use('/api/tasks', require('./routes/tasks'))
app.use('/api/logs', require('./routes/logs'))


app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})