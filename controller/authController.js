const User = require('../models/User')
const ErrorResponse = require('../utils/errorResponse')
const crypto = require('crypto')

const sendToken = (user, statusCode, res) => {
	const token = user.getSignedToken()

	res.status(statusCode).json({ success: true, token })
}

module.exports = {
	postRegister: async (req, res, next) => {
		const { username, email, password } = req.body
		try{
			const user = await User.create({
				username,
				email,
				password
			})

			sendToken(user, 201, res)
		}catch(err){
			next(err)
		}
	},
	postLogin: async (req, res, next) => {
		const { email, password } = req.body
		if(!email || !password) return next(new ErrorResponse('please fill all fields', 400))
		
		try{
			const user = await User.findOne({ email }).select('+password')

			if(!user) return next(new ErrorResponse('No user found matching that email', 400))

			const isMatch = await user.matchPassword(password)

			if(!isMatch) return next(new ErrorResponse('Invalid credentials'))

			sendToken(user, 200, res)
		}catch(err){
			next(err)
		}
	},
	postForgotPassword: async (req, res, next) => {
		const { email } = req.body
		try{
			const user = await User.findOne({ email })

			if(!user) return next(new ErrorResponse('Reset email could not be sent', 404))

			const resetToken = user.getResetToken()

			await user.save()

			try{
				res.status(200).json({
					success: true,
					data: 'notification of sent email via nodemailer/email provider with url link with token param',
					token: resetToken
				})
			}catch(err){
				user.resetPasswordToken = undefined
				user.resetPasswordExpire = undefined

				await user.save()

				return next(new ErrorResponse('Reset email could not be sent', 500))
			}
		}catch(err){
			next(err)
		}
	},
	putResetPassword: async (req, res, next) => {
		const resetToken = crypto
			.createHash('sha256')
			.update(req.params.resetToken)
			.digest('hex')
		try{
			const user = await User.findOne({
				resetPasswordToken: resetToken,
				resetPasswordExpire: { $gt: Date.now() }
			})

			if(!user) return next(new ErrorResponse('Invalid reset token', 400))

			user.password = req.body.password
			user.resetPasswordToken = undefined
			user.resetPasswordExpire = undefined

			await user.save()

			res.status(201).json({ success: true, data: 'Password successfully reset' })
		}catch(err){
			next(err)
		}
	}
}