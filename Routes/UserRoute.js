const { Router } = require('express')
const express = require('express')
const router = express.Router()
const userController = require('../Controllers/UserController')
const { admin, guest } = require('../Middlewares/Auth')

router.post('/login', guest, userController.loginUser)

router.post('/register', userController.registerUser)

router.get('/', userController.getUserDetails)

router.patch('/:userID', admin, userController.editUser)

router.delete('/:userID', admin, userController.deleteUser)

module.exports = router