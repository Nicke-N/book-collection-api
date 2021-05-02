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
    image: {
        type: String,
        default: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/600px-No_image_available.svg.png"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const book = mongoose.model('book', bookSchema)

module.exports = book