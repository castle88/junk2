const express = require('express')
const router = express.Router()
const { getTodos } = require('../controller/todoController')

router.get('/', getTodos)

module.exports = router