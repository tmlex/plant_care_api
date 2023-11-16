const Plant = require('../models/plant')
const Log = require('../models/log')

const getPlants = async (req, res) => {
  try {
    if (!req.user) {
      return res.sendStatus(401)
    }
    const { orderBy = '' } = req.query
    const userId = req.user._id
    const plants = await Plant.find({ userId }).sort(`${orderBy}`)
    res.send(plants)
  } catch {
    res.sendStatus(500)
  }
}

const getPlantById = async (req, res) => {
  if (!req.user) { return res.sendStatus(401) }
  try {
    const plant = await Plant.findById(req.params.id)
    res.send(plant)
  } catch {
    res.sendStatus(500)
  }
}

const getPlantLogs = async (req, res) => {
  try {
    const { plantId } = req.params
    const logs = await Log.find({ plantId }).sort({ createdDate: 'desc' })
    res.send(logs)
  } catch {
    res.sendStatus(500)
  }
}

const addPlant = async (req, res) => {
  try {
    const plant = {
      name: req.body.name,
      comment: req.body.comment,
      userId: req.user._id
    }
    await Plant.create(plant)
    res.sendStatus(200)
  } catch {
    res.sendStatus(500)
  }
}

const updatePlant = async (req, res) => {
  try {
    const plant = {
      name: req.body.name,
      comment: req.body.comment
    }
    await Plant.findByIdAndUpdate(req.params.id, plant)
    res.sendStatus(200)
  } catch {
    res.sendStatus(500)
  }
}

const updateTaskComment = async (req, res) => {
  try {
    const { plantId, taskId } = req.params
    const { comment } = req.body
    await Plant.findByIdAndUpdate(plantId, {
      $set: {
        [`tasks.${taskId}.comment`]: comment
      }
    })
    res.sendStatus(200)
  } catch {
    res.sendStatus(500)
  }
}

const updateTaskCompletionDate = async (req, res) => {
  try {
    const date = new Date()
    const { plantId, taskId } = req.params
    await Plant.findByIdAndUpdate(plantId, {
      $set: {
        [`tasks.${taskId}.completionDate`]: date
      }
    })
    await Log.create({
      createdDate: date,
      taskId,
      plantId
    })
    res.sendStatus(200)
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
}

const deletePlant = async (req, res) => {
  try {
    await Plant.findByIdAndDelete(req.params.id)
    res.sendStatus(200)
  } catch {
    res.sendStatus(500)
  }
}

module.exports = {
  getPlants,
  getPlantById,
  getPlantLogs,
  addPlant,
  updatePlant,
  deletePlant,
  updateTaskComment,
  updateTaskCompletionDate
}
