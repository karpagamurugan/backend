const express = require('express')
const router = express.Router()


// import controller
const { register, login, verifyToken, forgetPassword ,ChangePassword} = require('../controller/auth.js')

//controller routes
router.post('/register', register)
router.post('/login', login)
router.post('/verifyToken', verifyToken)
router.post('/forgetPassword', forgetPassword)
router.post('/changePassword', ChangePassword)



module.exports = router