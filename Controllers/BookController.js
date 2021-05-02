const books = require('../Models/BookModel')

module.exports = {

    async getCollection (req, res, next) {

        try {
            const collection = await books.find({})
            res.json(collection)
        } catch (error) {
            next(error)
        }
    },

    async getBook (req, res, next) {
        const id = req.params.bookID

        try {
            
            const book = await books.findOne({_id: id})
            res.json(book)

        } catch (error) {
            next(error)
        }
    },

    async addBook (req, res, next) {

        try {
            const book = new books(req.body)
            const bookExists = await checkDB(req.body)

            if (!bookExists) {
                book.save(err => {
                    if (err) return res.status(500).send(err)
                    return res.send(`${book.title} was added`)
                })
            } else {
                res.send('Book exists!')
            }

        } catch (error) {
            next(error)
        }
    },

    async editBook (req, res, next) {
        const id = req.params.bookID

        try {
            
            books.findByIdAndUpdate(
                id, 
                req.body,
                (err, book) => {
                    if (err) return res.status(500).send(err)
                   
                    return res.send(book)
            })

        } catch (error) {
            next(error)
        }

    },

    async deleteBook (req, res, next) {
        const id = req.params.bookID
        try {
            
            books.findByIdAndRemove(
                id, 
                (err, book) => {
                    if (err) return res.status(500).send(err)

                    return res.status(200).send({msg: `${book.title} was deleted!`})
            })

        } catch (error) {
            next(error)
        }

    }

}


const checkDB = async (book) => {

    try {
        const existingBooks = await books.find({title: book.title})
        var result = false
        if (existingBooks.length > 0) {

            existingBooks.map((element) => {

                (element.title === book.title && element.author === book.author) ? result = true : null
                
                if (result) return result
            })

        }

        return result

    } catch (error) {
        return error
    }


}