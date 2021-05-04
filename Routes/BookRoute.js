const express = require('express')
const router = express.Router()
const bookController = require('../Controllers/BookController')
const { admin, guest } = require('../Middlewares/Auth') 

router.get('/', bookController.getCollection)

router.post('/', admin, bookController.addBook)

router.patch('/:bookID', guest, bookController.editBook)

router.delete('/:bookID', admin, bookController.deleteBook)

router.get('/:bookID', bookController.getBook)

module.exports = router