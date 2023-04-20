const express = require('express')
const Users = require('../models/userModel')
const TotalProducts = require('../models/totalProducts')
const WhishList = require('../models/whishListModel')
const CartList = require('../models/cartListModel')
const Booking = require('../models/booking')

const getAllProducts = (req, res) => {
    // const id = req.body.id
    try {
        TotalProducts.find({}, ((err, result) => {
            if (!result) {
                res.send({
                    status: 400,
                    message: 'product error'
                })
            } else {

                res.send({
                    status: 200,
                    result
                })
            }
        }))
    } catch (err) {
        res.send({
            status: 500,
            message: err
        })
    }
}

const AddToWhishlist = (req, res) => {
    const productiId = req.body.productiId
    const userId = req.body.userId
    try {
        Users.findById({ _id: userId }, ((err, result) => {
            if (err) {
                res.send({
                    status: 200,
                    message: 'user not valid'
                })
            } else {
                TotalProducts.findOne({ _id: productiId }, ((e, r) => {
                    if (e) {
                        res.send({
                            status: 400,
                            error: 'Prodect id not valid'
                        })
                    } else {
                        WhishList.findOne({
                            userId: userId,
                            productId: productiId
                        }, ((e, v) => {
                            if (v !== null) {
                                WhishList.remove({
                                    userId: userId,
                                    productId: productiId
                                }, ((wE, wR) => {
                                    if (wR) {
                                        res.send({
                                            status: 200,
                                            message: 'Product remove from whishlist'
                                        })
                                    } else {
                                        res.send({
                                            status: 400,
                                            message: 'Product not from whishlist'
                                        })
                                    }

                                }))
                            } else {
                                const tempWhish = new WhishList({
                                    userId: userId,
                                    productId: productiId,

                                })
                                tempWhish.save((er, vl) => {
                                    if (er) {
                                        res.send({
                                            status: 400,
                                            error: er
                                        })
                                    } else {
                                        res.send({
                                            status: 200,
                                            result: vl
                                        })
                                    }
                                })
                            }
                        }))

                    }
                }))
            }

        }))
    } catch (err) {
        res.send({
            error: err,
            status: 500
        })
    }
    // res.send({ productiId, userId })
}


const GetWishlist = (req, res) => {
    const userId = req.params.id

    WhishList.find({ userId: (userId) })
        .populate('productId')
        .exec((err, result) => {
            if (err) {
                res.send({
                    status: 400,
                    error: err
                })
            } else {
                res.send({
                    status: 200,
                    wishlist: result
                })
            }
        })
}
const addToCart = (req, res) => {
    const userId = req.body.userId
    const productId = req.body.productId
    const price = req.body.price
    try {
        Users.findById({ _id: userId }, ((err, result) => {
            if (result) {
                CartList.findOne({
                    userId: userId,
                    productId: productId
                }, ((cE, cR) => {
                    if (cR) {
                        CartList.find({ userId: userId, productId: productId })
                            .populate('productId')
                            .exec((e, r) => {
                                let temp = {
                                    userId: userId
                                }
                                r?.map((val, index) => {

                                    if (val.userId.toString() === temp.userId) {
                                        CartList.findOneAndUpdate({
                                            userId: userId,
                                            productId: productId
                                        }, {
                                            productPrice: parseFloat(val.productPrice) + parseFloat(price),
                                            productCount: val.productCount + 1
                                        }, { new: true }, (eFU, rFU) => {
                                            if (eFU === null) {
                                                res.send({
                                                    productPrice: val.productPrice,
                                                    price: price,
                                                    productCount: val.productCount + 1,
                                                    val: val
                                                })
                                            } else {
                                                res.send({
                                                    error: eFU,
                                                    status: 400
                                                })
                                            }
                                        })

                                    } else {
                                        res.send({
                                            message: 'not'
                                        })
                                    }
                                })
                            })
                    } else {
                        const cart = new CartList({
                            userId: userId,
                            productId: productId,
                            productCount: 1,
                            productPrice: price
                        })
                        cart.save((sE, sR) => {
                            if (sR) {
                                res.send({
                                    message: 'Product add to cart',
                                    status: 200
                                })
                            } else {
                                res.send({
                                    message: 'Product not add ',
                                    status: 400
                                })
                            }
                        })
                    }
                }))
            } else {
                res.send({
                    message: {
                        error: 'user not valid',
                        status: 400
                    }
                })
            }
        }))
    } catch (err) {
        res.send({
            error: err,
            status: 500
        })
    }
}

const cartList = (req, res) => {
    const userId = req.params.id
    CartList.find({ userId: (userId) })
        .populate('productId')
        .exec((err, result) => {
            res.send({
                err, result
            })
        })
}

const removeCart = (req, res) => {
    const productId = req.body.productId
    const userId = req.body.userId
    try {
        CartList.find({ productId, userId }, ((err, result) => {

            if (err !== null) {
                res.send({
                    status: 500,
                    message: 'finding error'
                })
            } else {
                CartList.remove({ productId, userId }, ((er, rs) => {
                    res.send({
                        status: 200,
                        message: 'Product remove from the cart'
                    })
                }))
            }

        }))
    } catch (err) {
        res.send({
            status: 500,
            message: 'server issue'
        })
    }

}

const productCount = (req, res) => {
    const productId = req.body.productId
    const userId = req.body.userId
    const type = req.body.type
    try {
        CartList.find({ userId, productId }, ((err, result) => {
            if (err === null) {
                if (type === 'add') {
                    CartList.find({ productId, userId })
                        .populate('productId')
                        .exec((e, r) => {
                            if (e === null) {
                                const tempId = {
                                    userId: userId
                                }
                                r.map((val, inx) => {
                                    if (val.userId.toString() === tempId.userId) {
                                        CartList.findOneAndUpdate({ productId, userId }, {
                                            productPrice: parseFloat(val.productPrice) + parseFloat(val.productId.price),
                                            productCount: val.productCount + 1
                                        }, ((uE, uR) => {
                                            res.send({
                                                status: 200,
                                                message: 'Product count add successfully'
                                            })
                                        }))
                                    }
                                })
                            } else {
                                res.send({
                                    remove: 'Cout not increase'
                                })
                            }
                        })
                } else if (type === 'remove') {
                    CartList.find({ productId, userId })
                        .populate('productId')
                        .exec((e, r) => {
                            if (e === null) {
                                const tempId = {
                                    userId: userId
                                }
                                r.map((val, inx) => {
                                    if (val.productCount > 1) {
                                        if (val.userId.toString() === tempId.userId) {
                                            CartList.findOneAndUpdate({ productId, userId }, {
                                                productPrice: parseFloat(val.productPrice) - parseFloat(val.productId.price),
                                                productCount: val.productCount - 1
                                            }, ((uE, uR) => {
                                                res.send({
                                                    uE, uR
                                                })
                                            }))
                                        }
                                    } else {
                                        CartList.findOneAndRemove({ productId, userId }, ((eR, rR) => {
                                            res.send({
                                                status: 200,
                                                message: 'Product remove from the cart'
                                            })
                                        }))
                                    }
                                })
                            } else {
                                res.send({
                                    remove: 'Cout not decrese'
                                })
                            }
                        })
                } else {
                    res.send({
                        erro: 'erro'
                    })
                }
            } else {
                res.send({
                    status: 400,
                    message: 'Product not found'
                })
            }

        }))
    } catch (err) {
        res.send({
            status: 500,
            message: 'server issue'
        })
    }
}

const booking = (req, res) => {
    const userId = req.body.userId
    const payment = req.body.payment
    const booking = req.body.booking

    try {
        Users.findById({ _id: Object(userId) }, (error, result) => {
            if (error === null) {
                const bookingProduct = new Booking({
                    userId,
                    payment,
                    booking: booking
                })
                bookingProduct.save((bE, bR) => {
                    res.send({
                        status: 200,
                        result: {
                            message: 'Booking Confirm',
                            bookingId: bR._id
                        }
                    })
                })
            } else {
                res.send({
                    status: 400,
                    messag: 'User Not Valide',
                })
            }
        })
    } catch (err) {
        res.send({
            status: 500,
            message: 'server issue'
        })
    }
}
const bookingList = (req, res) => {
    const userId = req.body.userId
    try {

        Booking.find({ userId })
            .populate({
                path: 'booking.productId',
                model: 'TotalProducts',
            })
            .lean() // add this to get plain JavaScript objects instead of Mongoose documents
            .exec((error, result) => {
                if (error) {
                    res.send({
                        status: 500,
                        message: 'server issue'
                    })
                } else {
                    let tempdata = result.map(el => {
                        return {
                            ...el,
                            booking: el.booking.map(val => {
                                let product = val.productId
                                delete val.productId;
                                return {
                                    ...val,
                                    ...product
                                }
                            })
                        }
                    })
                    res.send(tempdata)
                }
            })
    } catch (err) {
        res.send({
            status: 500,
            message: 'server issue'
        })
    }
}
const cancelBooking = (req, res) => {
    const { bookingId, productId } = req.body
    try {
        const productIdToDelete = productId;

        Booking.findOne({ _id:bookingId }, (err, booking) => {
            if (err) {
                res.send(err);
                return;
            }

            // If booking is null, the user does not have any bookings
            if (!booking) {
                res.send('User has no bookings');
                return;
            }

            // Find the index of the booking containing the product to delete
            const bookingIndex = booking.booking.findIndex((item) => item.productId.toString() === productIdToDelete);

            // If the product is not found in the booking, bookingIndex will be -1
            if (bookingIndex === -1) {
                res.send('Product not found in the booking');
                return;
            }

            // Remove the booking containing the product to delete
            booking.booking.splice(bookingIndex, 1);

            // Save the updated booking
            booking.save((err) => {
                if (err) {
                    res.send(err);
                    return;
                }
                res.send(`Product with ID ${productIdToDelete} has been removed from the booking`);
            });
        });
    } catch (err) {
        res.send({
            status: 500,
            message: 'server issue'
        })
    }
}
module.exports = {
    AddToWhishlist,
    getAllProducts,
    GetWishlist,
    addToCart,
    cartList,
    removeCart,
    productCount,
    booking,
    bookingList,
    cancelBooking
}