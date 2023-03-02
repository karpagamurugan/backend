const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    UserId:{
        type:String,
    },
    UserName:{
        type:String,
        required: [true, 'user name required'],
        min:[5,'minimum 5 letters'],
        max:[20,'maximum 20 letters'],
    },
    Phone:{
        type:Number,
        required: [true, 'user Phone required'],
        min:[10,'Phone number not valid'],
    },
    Mail:{
        type:String,
        required: [true, 'user MailId required'],
    },  
    Password:{
        type:String,
        required: [true, 'user Password required'],
        min:[8,'password min 8 carrecter']
    },
    Otp:{
        type:Number,
    },
})

const collectionName = 'Users'

module.exports = mongoose.model('Users',UserSchema,collectionName)