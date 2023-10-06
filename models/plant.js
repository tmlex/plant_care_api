const mongoose = require('mongoose')
const { Schema } = mongoose

const PlantSchema = new Schema({
    name: String,
    comment: String,
    userId: String,
    tasks: {
        type: Map,
        of: new Schema({
            completionDate: { type: Date },
            comment: { type: String }
        }),
        default: {},
        required: true
    }
})

module.exports = mongoose.model('Plant', PlantSchema)