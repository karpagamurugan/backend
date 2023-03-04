const express = require('express')
const ToDoList = require('../models/ToDoListModel')


const AddToDo = (req, res) => {
    res.send({
        message: 'working'
    })
}

module.exports = {
    AddToDo
}