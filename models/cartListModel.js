const mongoose = require('mongoose')


const cartListSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TotalProducts'
    },
    productPrice: {
        type: Number
    },
    productCount: {
        type: Number
    }
})

module.exports = mongoose.model('CartList', cartListSchema, 'CartList')