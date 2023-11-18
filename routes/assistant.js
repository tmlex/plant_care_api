const express = require('express')
const router = express.Router()
const controller = require('../controllers/assistant')

router.post('/autocomplete/:field', (req, res) => {
    const { field } = req.params
    switch (field) {
        case 'taskRecurrence': {
            return controller.autocompleteTaskRecurrence(req, res)
        }
        default: {
            res.send('Unknown field')
        }
    }
})

module.exports = router