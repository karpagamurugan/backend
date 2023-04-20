const express = require('express')
const db = require('./config/db')
const auth = require('./routes/auth.js')
const app = express()
const bodyParser = require('body-parser')
const jwt = require("jsonwebtoken")
const mangoose = require('mongoose')
const TotalProducts = require('./models/totalProducts')
const cors = require('cors')


//cors
const corsOptions = {
  origin: '*',
  credentials: true,
  optionSuccessStatus: 200,
}

app.use(cors(corsOptions))
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


// listerning server
app.listen(3001, () => {
    console.log('server run 3001')
})

// external middleware
app.use(bodyParser.json())

// rout
app.use('/api', auth)

