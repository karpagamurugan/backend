const mongoose = require('mongoose')
require('dotenv').config()

mongoose.set('strictQuery', false)
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on("error", console.error.bind(console, 'db not connected'))
db.once("open", function () {
    console.log('db connected succesfully')
})