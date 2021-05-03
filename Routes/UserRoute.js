const { Router } = require('express')
const express = require('express')
const router = express.Router()
const userController = require('../Controllers/UserController')

router.post('/login', userController.loginUser)
router.post('/register', userController.registerUser)
router.get('/', userController.getUserDetails)
router.patch('/:userID', userController.editUser)
router.delete('/:userID', userController.deleteUser)

module.exports = router