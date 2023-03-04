const express = require('express')
const Product = require('../models/productModerl')


const addProduct = async (req, res) => {
    const {
        title,
        image,
        catagory,
        price,
        description,
    } = req.body
    try {
        Product.findOne({ title }, ((err, result) => {
            if (result !== null) {
                res.send({
                    status: 400,
                    message: 'product already axist'
                })
            } else if (err) {
                res.send({
                    status: 400,
                    message: err
                })
            } else {
                const product = new Product({
                    title,
                    image,
                    catagory,
                    price,
                    description,
                })
                product.save((error, value) => {
                    if (error) {
                        res.send({
                            status: 400,
                            message: error.message
                        })
                    } else {
                        res.send({
                            status: 200,
                            message: 'product stored successfully...'
                        })
                    }
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

const getProduct = async (req, res) => {
    try {
        Product.find({}, ((err, result) => {
            if (!result) {
                res.send({
                    status: 400,
                    message: el, err
                })
            } else {
                res.send({
                    status: 200,
                    products: {
                        result
                    }
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

const removeProduct = (req, res) => {

    const { productId } = req.body

    try {
        Product.findById({ _id: productId }, ((err, resul) => {
            if (err) {
                res.send({
                    status: 400,
                    message: 'product not found'
                })
            } else if (resul === null) {
                res.send({
                    status: 400,
                    message: 'product not found'
                })
            } else {
                Product.remove({ _id: productId }, ((err, result) => {
                    if (err) {
                        res.send({
                            status: 400,
                            error: err
                        })
                    } else {
                        res.send({
                            status: 200,
                            message: {
                                status: 'Product deleted successfully',
                                result,
                            }
                        })
                    }
                }))

            }
        }))
    } catch (err) {
        res.send({
            status: 500,
            message: err
        })
    }
}

const updateProduct = (req, res) => {
    const {
        _id,
        title,
        image,
        catagory,
        price,
        description,
    } = req.body
    try {
        Product.findByIdAndUpdate({ _id }, {
            title,
            image,
            catagory,
            price,
            description,
        }, ((err, result) => {
            if (!result) {
                res.send({
                    status: 400,
                    message: 'error on updating'
                })
            } else {
                res.send({
                    status: 200,
                    message: 'Product changes updated successfully...'
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

module.exports = {
    addProduct,
    getProduct,
    removeProduct,
    updateProduct
}