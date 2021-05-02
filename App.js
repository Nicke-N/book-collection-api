const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
bodyParser = require('body-parser')

require('dotenv').config()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

const collectionRoute = require('./Routes/BookRoute')
const userRoute = require('./Routes/UserRoute')

app.use('/user', userRoute);
app.use('/collection', collectionRoute);


mongoose.connect(process.env.DB_CONNECTION,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    console.log('connected to DB')
)

module.exports = app