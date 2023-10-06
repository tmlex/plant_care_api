const Task = require('../models/task')
const Log = require('../models/log')

const getTasks = async (req, res) => {
    try {
        const userId = req.user?._id
        const tasks = await Task.find({ userId })
        res.status(200).send(tasks)
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
}

const getTaskLogs = async (req, res) => {
    try {
        const { taskId } = req.params
        const logs = await Log.find({ taskId })
        res.status(200).send(logs)
    } catch {
        res.sendStatus(500)
    }
}

const addTask = async (req, res) => {
    try {
        const task = {
            userId: req.user._id,
            name: req.body.name,
            comment: req.body.comment,
            rRule: req.body.rRule
        }
        await Task.create(task)
        res.sendStatus(201)
    } catch {
        res.sendStatus(500)
    }
}

const updateTask = async (req, res) => {
    try {
        const taskId = req.params.taskId
        const task = {
            name: req.body.name,
            comment: req.body.comment,
            rRule: req.body.rRule
        }
        await Task.findByIdAndUpdate(taskId, task)
        res.sendStatus(200)
    } catch {
        res.sendStatus(500)
    }
}

const deleteTask = async (req, res) => {
    try {
        const taskId = req.params.taskId
        await Task.findByIdAndDelete(taskId)
        res.sendStatus(200)
    } catch {
        res.sendStatus(500)
    }
}

module.exports = {
    getTasks,
    getTaskLogs,
    addTask,
    updateTask,
    deleteTask
}