const Log = require('../models/log')

const getLogs = async (req, res) => {
    try {
        const logs = await Log.find()
        res.status(200).send(logs)
    } catch {
        res.sendStatus(500)
    }
}

const addLog = async (req, res) => {
    try {
        const log = req.body
        await Log.create(log)
        res.send(201)
    } catch (err) {
        console.error(err)
        res.sendStatus(500)
    }
}

const deleteLog = async (req, res) => {
    try {
        const { log } = req.params
        await Log.findByIdAndDelete(id)
        res.sendStatus(200)
    } catch {
        res.sendStatus(500)
    }
}

module.exports = {
    getLogs,
    addLog,
    deleteLog
}