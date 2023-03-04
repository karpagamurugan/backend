const express = require('express')
const router = express.Router()



// import controller
const { register, login, verifyToken, forgetPassword, ChangePassword } = require('../controller/auth.js')
const { AddToDo } = require('../controller/toDo')
const { addProduct, getProduct, removeProduct, updateProduct } = require('../controller/product')
//controller routes user
router.post('/register', register)
router.post('/login', login)
router.post('/verifyToken', verifyToken)
router.post('/forgetPassword', forgetPassword)
router.post('/changePassword', ChangePassword)

//controller routes Todo
router.post('/addToDo', AddToDo)

//controller routes Todo
router.post('/addProduct', addProduct)
router.post('/getProduct', getProduct)
router.post('/removeProduct', removeProduct)
router.post('/updateProduct', updateProduct)



module.exports = router