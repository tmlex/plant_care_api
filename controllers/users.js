const User = require('../models/user')
const bcrypt = require('bcryptjs')

const getUsers = async (req, res) => {
    const users = await User.find()
    res.send(users)
}

const getActiveUser = (req, res) => {
    if (req.user) {
        res.status(200).send(req.user)
    } else {
        res.sendStatus(401)
    }
}

const logout = (req, res) => {
    req.logout((err) => {
        if (err) { return next(err) }
        res.sendStatus(200)
    })
}

const register = async (req, res) => {
    try {

        const { username, password } = req.body

        if (!username) {
            return res.status(400).send({ message: 'Missing username' })
        }

        if (!password) {
            return res.status(400).send({ message: 'Missing password' })
        }

        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        
        // Check if user already exists

        const user = await User.exists({ username })
        
        if (user) {
            return res.status(403).send({ message: 'User already exists' })
        }
        
        await User.create({
            username,
            password: hashedPassword
        })

        res.sendStatus(201)
    } catch (err) {
        res.sendStatus(500)
    }

}

module.exports = {
    getUsers,
    getActiveUser,
    // login,
    logout,
    register
}