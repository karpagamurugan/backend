const express = require('express')
const router = express.Router()



// import controller
const { register, login, verifyToken, forgetPassword, ChangePassword } = require('../controller/auth.js')
const { AddToDo } = require('../controller/toDo')
const { addProduct, getProduct, removeProduct, updateProduct } = require('../controller/product')
const { AddToWhishlist, getAllProducts, GetWishlist, addToCart, cartList, removeCart, productCount, booking, bookingList ,cancelBooking} = require('../controller/cart')


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

//controller routes Cart
router.post('/AddToWhishlist', AddToWhishlist)
router.post('/getAllProducts', getAllProducts)
router.get('/GetWishlist/:id', GetWishlist)
router.post('/addToCart', addToCart)
router.get('/cartList/:id', cartList)
router.post('/removeCart', removeCart)
router.post('/productCount', productCount)
router.post('/booking', booking)
router.post('/bookingList', bookingList)
router.post('/cancelBooking', cancelBooking)


module.exports = router