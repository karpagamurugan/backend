const mongoose = require('mongoose')

const totalProductSchema = new mongoose.Schema({
    id: {
        type: Number,
    },
    title: {
        type: String,
        required: [true, 'title is required']
    },
    description: {
        type: String,
        required: [true, 'description is required']
    },
    price: {
        type: String,
        required: [true, 'price is required']
    },
    discountPercentage: {
        type: String,
        required: [true, 'discountPercentage is required']
    },
    rating: {
        type: String,
        required: [true, 'rating is required']
    },
    stock: {
        type: String,
        required: [true, 'stock is required']
    },
    brand: {
        type: String,
        required: [true, 'brand is required']
    },
    category: {
        type: String,
        required: [true, 'category is required']
    },
    thumbnail: {
        type: String,
        required: [true, 'thumbnail is required']
    },
})

module.exports = mongoose.model('TotalProducts', totalProductSchema, 'TotalProducts')