const express = require('express')
const router = express.Router()
const { getTodos, postTodo, deleteTodo, putTodo } = require('../controller/todoController')

router.get('/', getTodos)

router.post('/create', postTodo)

router.delete('/delete/:id', deleteTodo)

router.put('/update', putTodo)

module.exports = router