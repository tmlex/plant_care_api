const mongoose = require('mongoose')
const { Schema } = mongoose

const schema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    name: String,
    comment: String,
    rRule: String
})

module.exports = mongoose.model('Task', schema)