const mongoose = require('mongoose')

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
    collectorRating: {
        type: Number
    },
    visitorRating: {
        type: Number
    },
    ratedBy: {
        type: Array
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