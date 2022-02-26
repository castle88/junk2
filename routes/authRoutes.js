const express = require('express')
const router = express.Router()
const { postRegister, postLogin, postForgotPassword, putResetPassword } = require('../controller/authController')

router.post('/register', postRegister)

router.post('/login', postLogin)

router.post('/forgotPassword', postForgotPassword)

router.put('/resetPassword', putResetPassword)

module.exports = router