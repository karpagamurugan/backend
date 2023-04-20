const express = require('express')
const userModel = require('../models/userModel')
const app = express()
const Users = require('../models/userModel')
const jwt = require('jsonwebtoken')
const transporter = require('../middleware/NodeMailer')
const nodeMailer = require('nodemailer')


const register = async (req, res) => {
    try {
        const Mail = req.body.Mail
        userModel.findOne({ Mail: Mail }, function (err, result) {
            if (result !== null) {
                res.send({
                    message: 'Mail already exixt'
                })
            } else if (err) {
                res.send({
                    message: 'error'
                })
            } else {
                const user = new Users(req.body)
                user.save((err, val) => {
                    if (val?._id) {
                        return res.status(200).json({ message: user });
                    } else if (err) {
                        res.status(400).json({ message: err.message });
                    }
                })
            }
        })
    } catch (err) {
        res.status(400).json({ message: err });
    }
}


const login = async (req, res) => {
    const Mail = req.body.Mail
    const Password = req.body.Password
    Users.findOne({ Mail: Mail, Password: Password }, function (err, result) {
        if (result === null) {
            res.send({
                status: 400,
                message: 'user not valid',
            })
        } else if (err) {
            res.send({
                status: 400,
                message: 'user not valid',
            })
        } else {
            const token = jwt.sign({
                Mail: result.Mail,
                Id: result.UserId,
            }, 'secretKey1999', { expiresIn: 120 * 60 * 96 })
            res.send(
                {
                    message: {
                        UserName: result.UserName,
                        id: result._id,
                        token: token
                    }
                }
            )
        }
    })
}

const verifyToken = async (req, res) => {
    const token = req.body.token
    const decodeToken = await jwt.decode(token)
    // res.send({
    //     decodeToken: decodeToken
    // })
    Users.findOne({ Mail: decodeToken.Mail }, (err, result) => {
        if (err) {
            res.send({
                status: 400,
                message: 'invalid token err'
            })
        } else if (result === null) {
            res.send({
                status: 400,
                message: 'invalid token'
            })
        } else {
            const userData = {
                userName: result.UserName,
                Mail: result.Mail,
                Phone: result.Phone,
            }
            if (decodeToken.exp < Date.now() / 1000) {
                res.send({
                    status: 400,
                    message: 'token not valid'
                })
            } else {
                res.send({
                    status: 200,
                    message: {
                        result: userData,
                        message: 'verify succesfully'
                    }
                })
            }
        }
    })
}

const forgetPassword = (req, res) => {
    const Mail = req.body.Mail

    Users.findOne({ Mail: Mail }, (err, result) => {
        if (result === null) {
            res.send({
                status: 400,
                message: 'given mail id not valid'
            })
        } else if (result.Mail) {
            const genarateOtp = (length = 4) => {
                let otp = ''
                for (let i = 0; i < length; i++) {
                    otp += Math.floor(Math.random() * 10)
                }
                return otp
            }
            let tempOtp = genarateOtp()
            Users.findOneAndUpdate({ Mail: Mail }, { Otp: tempOtp }, { new: true }, (error, data) => {
                if (error) {
                    console.log(error)
                } else {
                    console.log(data)
                }
            })
            const transporterMail = nodeMailer.createTransport({
                host: 'mindmadetech.in',
                port: 587,
                secure: false,
                auth: {
                    user: '_mainaccount@mindmadetech.in',
                    pass: '1boQ[(6nYw6H.&_hQ&'
                },
                tls: {
                    rejectUnauthorized: false
                }
            })
            const composeremail = {
                from: 'karpagamurugan@mindmade.in',
                to: result.Mail,
                subject: 'test mail',
                text: tempOtp
            }
            transporterMail.sendMail(composeremail, ((errMail, resultMail) => {
                if (errMail) {
                    res.send({
                        status: 400,
                        message: {
                            message: 'mail not send',
                            error: errMail
                        },
                    })
                } else {

                    res.send({
                        status: 200,
                        message: {
                            message: 'mail send successfully',
                            otp: tempOtp
                        }
                    })
                }
            }))
        }
        if (err) {
            res.send({
                status: 400,
                message: 'mail id not valid'
            })
        }
    })
}

const ChangePassword = (req, res) => {
    const Otp = req.body.Otp
    const Mail = req.body.Mail
    const NewPassword = req.body.Password
    Users.findOne({ Mail: Mail }, (err, result) => {
        if (err) {
            res.send({
                status: 400,
                message: 'Otp Does not match'
            })
        } else if (result === null) {
            res.send({
                status: 400,
                message: 'Otp Does not match'
            })
        } else {
            if (result.Otp === parseFloat(Otp)) {
                Users.findOneAndUpdate({ Mail: Mail }, { Password: NewPassword, Otp: null }, { new: true }, () => {
                    res.send({
                        status: 200,
                        message: 'Password Change successfully'
                    })
                })
            } else {
                res.send({
                    status: 400,
                    message: 'Otp not match'
                })
            }
        }
    }
    )

}

module.exports = {
    register,
    login,
    verifyToken,
    forgetPassword,
    ChangePassword
}