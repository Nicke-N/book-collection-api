const express = require('express')
const app = express()
const cors = require('cors')
bodyParser = require('body-parser')

const db = require('./Database/Db')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

const collectionRoute = require('./Routes/BookRoute')
const userRoute = require('./Routes/UserRoute')

app.use('/user', userRoute);
app.use('/collection', collectionRoute);

db.connect()

module.exports = app