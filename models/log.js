const mongoose = require('mongoose')
const { Schema } = mongoose

const AttachmentSchema = new Schema({
    name: String,
    mimeType: { type: String, required: true },
    link: { type: String, required: true }
})

const LogSchema = new Schema({
    taskId: { type: Schema.Types.ObjectId, ref: 'Task', required: true },
    plantId: { type: Schema.Types.ObjectId, ref: 'Plant', required: true },
    createdDate: { type: Date, default: Date.now(), required: true },
    comment: String,
    attachments: [{ type: AttachmentSchema }]
})

module.exports = mongoose.model('Log', LogSchema)