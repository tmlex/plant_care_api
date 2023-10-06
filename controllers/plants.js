const Plant = require('../models/plant')
const Log = require('../models/log')
const mongoose = require('mongoose')

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
    const userId = req.user._id
    const { plantId, taskId } = req.params
    await Plant.findByIdAndUpdate(plantId, {
      $set: {
        [`tasks.${taskId}.completionDate`]: date
      }
    })
    await Log.create({
      createdDate: date,
      userId,
      taskId
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
  addPlant,
  updatePlant,
  deletePlant,
  updateTaskComment,
  updateTaskCompletionDate
}
