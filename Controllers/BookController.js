const books = require('../Models/BookModel')

module.exports = {

    async getCollection (req, res, next) {

        try {
            const collection = await books.getCollection()
            res.json(collection)
        } catch (error) {
            next(error)
        }
    },

    async getBook (req, res, next) {
        const id = req.params.bookID

        try {
            
            const book = await books.getBook(id)
            res.json(book)

        } catch (error) {
            next(error)
        }
    },

    async addBook (req, res, next) {

        try {
            
            const book = await books.addBook(req.body)
            res.status(200).send('Book was added!')

        } catch (error) {
            next(error)
        }
    },

    async editBook (req, res, next) {
        const id = req.params.bookID
        var update
        if (req.user === 'guest') {
            if (!req.body.personalRating) return 'No rating!'
           update = guestRating(id, req.body.personalRating)
        } else {
            update = req.body
        }
        try {
            
            await books.editBook(id, update)
            res.status(200).send('Book was updated!')

        } catch (error) {
            next(error)
        }

    },

    async deleteBook (req, res, next) {
        const id = req.params.bookID
        try {
            
            await books.deleteBook(id)
            res.status(200).send('Book was deleted!')

        } catch (error) {
            next(error)
        }

    },


}


const guestRating = async (bookID, rating) => {

    let book = await books.getBook(bookID)
    book.guests ++
    book.guestsRating += rating

    return book
}