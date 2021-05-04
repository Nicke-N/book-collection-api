const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false);
const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    publisher: {
        type: String,
        required: true
    },
    series: {
        type: String,
        default: 'none'
    },
    image: {
        type: String,
        default: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/600px-No_image_available.svg.png"
    },
    personalRating: {
        type: Number,
        default: 0
    },
    visitorsRating: {
        type: Number,
        default: 0
    },
    ratedBy: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const books = mongoose.model('book', bookSchema)

module.exports = {

    async getCollection () {
        try {
            const collection = await books.find({})
            return collection
        } catch (error) {
            return error
        }
    },

    async getBook (bookID) {
    
        try {
            
            const book = await books.findOne({_id: bookID})
            return book

        } catch (error) {
            return error
        }
    },

    async addBook (bookInfo) {

        try {
            
            const bookExists = await checkDB(bookInfo)

            if (!bookExists) {
                const book = new books(bookInfo).save(err => {
                    if (err) return err
                    return `Book was added`
                })
            } else {
                return 'Book exists!'
            }

        } catch (error) {
            return error
        }
    },

    async editBook (bookID, bookInfo) {
       
        try {
            
            books.findByIdAndUpdate(
                bookID, 
                bookInfo,
                (err, book) => {
                    if (err) return err
                   
                    return 'Book was updated!'
            })

        } catch (error) {
            return error
        }

    },

    async deleteBook (bookID) {
      
        try {
            
            books.findByIdAndRemove(
                bookID, 
                (err, book) => {
                    if (err) return err

                    return 'Book was deleted!'
            })

        } catch (error) {
            return error
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