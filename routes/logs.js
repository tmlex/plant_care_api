const express = require('express')
const router = express.Router()
const controller = require('../controllers/logs')

router.get('/', controller.getLogs)

router.post('/', controller.addLog)

router.delete('/:id', controller.deleteLog)

module.exports = router