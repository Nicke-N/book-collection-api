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
            
             await books.addBook(req.body)
            res.status(200).send('Book was added!')

        } catch (error) {
            next(error)
        }
    },

    async editBook (req, res, next) {

        const id = req.params.bookID
        var update

        if (req.user === 'guest') {
            update = await guestRating(id, req.body)
           
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


const guestRating = async (bookID, body) => {

    let book = await books.getBook(bookID)
    let change = false

    if (book.guestsRating.length > 0) {
        (book.guestsRating).some((element, index) => {
           
            if (element.guestID && element.guestID === body.guestID) {
                book.guestsRating[index].rating = body.rating
                 change = true
            }
        })
    }
    
    
    if(!change) {
        book.guestsRating.push(body)
    }
 
    return book
}