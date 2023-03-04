const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    productId: {
        type: String
    },
    title: {
        type: String,
        required: [true, 'product title is missing']
    },
    image: {
        type: String,
        required: [true, 'product image missing']
    },
    catagory: {
        type: String,
        required: [true, 'product catagory missing']
    },
    price: {
        type: Number,
        required: [true, 'product price missing']
    },
    description: {
        type: String,
        required: [true, 'product description missing']
    },
})

const collectionName = 'Product'
module.exports = mongoose.model('Product', productSchema, collectionName)