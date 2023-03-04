const mongoose = require('mongoose')

const ToDoListSchema = new mongoose.Schema({
    id: String,
    ToDo: {
        type: String
    },
})

const collectionName = 'ToDoList'

module.exports = mongoose.model('ToDoList', ToDoListSchema, collectionName)