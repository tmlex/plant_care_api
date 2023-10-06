const express = require('express')
const router = express.Router()
const controller = require('../controllers/tasks')

router.get('/', controller.getTasks)

router.get('/:taskId/logs', controller.getTaskLogs)

router.post('/', controller.addTask)

router.patch('/:taskId', controller.updateTask)

router.delete('/:taskId', controller.deleteTask)

module.exports = router