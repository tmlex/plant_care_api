const mongoose = require('mongoose')
const { Schema } = mongoose

const schema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: false },
    password: { type: String, required: false, select: false },
    googleId: { type: String, required: false, select: false },
    sessionToken: { type: String, select: false }
})

module.exports = mongoose.model('User', schema)