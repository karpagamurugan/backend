const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: [true, 'User id is required']
    },
    booking: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'TotalProducts'
            },
            productPrice: {
                type: Number,
                required: [true, 'Product Price is required']
            },
            productCount: {
                type: Number,
                required: [true, 'Product Count is required']
            }
        }
    ],
    payment: {
        type: Boolean,
        required: [true, 'Payment is required']
    }
})

module.exports = mongoose.model('Booking', bookingSchema, 'Booking')