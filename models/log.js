const mongoose = require('mongoose')
const { Schema } = mongoose

const AttachmentSchema = new Schema({
    name: String,
    mimeType: { type: String, required: true },
    link: { type: String, required: true }
})

const LogSchema = new Schema({
    taskId: { type: Schema.Types.ObjectId, ref: 'Task' },
    createdDate: { type: Date, default: Date.now() },
    comment: String,
    attachments: [{ type: AttachmentSchema }]
})

module.exports = mongoose.model('Log', LogSchema)