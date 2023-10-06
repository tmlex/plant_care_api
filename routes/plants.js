const express = require('express')
const router = express.Router()
const controller = require('../controllers/plants')

router.get('/', controller.getPlants)

router.get('/:id', controller.getPlantById)

router.post('/', controller.addPlant)

router.patch('/:id', controller.updatePlant)

router.patch('/:plantId/tasks/:taskId/comment', controller.updateTaskComment)

router.patch('/:plantId/tasks/:taskId/completed', controller.updateTaskCompletionDate)

router.delete('/:id', controller.deletePlant)

module.exports = router