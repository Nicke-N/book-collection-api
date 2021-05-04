const express = require('express')
const router = express.Router()
const bookController = require('../Controllers/BookController')

router.get('/', bookController.getCollection)

router.post('/', bookController.addBook)

router.patch('/:bookID', bookController.editBook)

router.delete('/:bookID', bookController.deleteBook)

router.get('/:bookID', bookController.getBook)

module.exports = router