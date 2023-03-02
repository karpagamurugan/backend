const express = require('express')
const db = require('./config/db')
const auth = require('./routes/auth.js')
const app = express()
const bodyParser = require('body-parser')
const jwt = require("jsonwebtoken")

// listerning server
app.listen(3001, () => {
    console.log('server run 3001')
})

// external middleware
app.use(bodyParser.json())

// rout
app.use('/api', auth)
