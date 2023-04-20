const mongoose = require('mongoose')


const WhishListSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
      },
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TotalProducts'
      }
    // title: {
    //     type: String,
    //     required: [true, 'Title is required']
    // },
    // description: {
    //     type: String,
    //     required: [true, 'description is required']
    // },
    // price: {
    //     type: Number,
    //     required: [true, 'price is required']
    // },
    // discountPercentage: {
    //     type: Number,
    //     required: [true, 'discountPercentage is required']
    // },
    // rating: {
    //     type: Number,
    //     required: [true, 'rating is required']
    // },
    // brand: {
    //     type: String,
    //     required: [true, 'brand is required']
    // },
    // category: {
    //     type: String,
    //     required: [true, 'category is required']
    // },
    // thumbnail: {
    //     type: String,
    //     required: [true, 'category is required']
    // },
    // images: []
})

module.exports = mongoose.model('WhishList', WhishListSchema, 'WhishList')