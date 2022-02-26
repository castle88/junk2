const express = require('express')
const router = express.Router()
const { getTodos, postTodo, deleteTodo } = require('../controller/todoController')

router.get('/', getTodos)

router.post('/create', postTodo)

router.delete('/delete', deleteTodo)

module.exports = router