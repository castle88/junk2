const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')

const UserSchema = mongoose.Schema({
	username: {
		type: String,
		required: [true, 'Please provide all fields']
	},
	email: {
		type: String,
		required: [true, 'Please provide all fields'],
		unique: true,
		match: [
			/^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/,
      			"Please provide a valid email",
		]
	},
	password: {
		type: String,
		required: [true, 'Please provide all fields'],
		minLength: 6,
		select: false
	},
	resetPasswordToken: String,
	resetPasswordExpire: Date
})

UserSchema.pre('save', async function (next) {
	if(!this.isModified('password')) {
		next()
	}

	this.password = await bcrypt.hash(this.password, 10)
	next()
})

UserSchema.methods.matchPassword = async function (password) {
	return await bcrypt.compare(password, this.password)
}

UserSchema.methods.getSignedToken = function () {
	return jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE })
}

UserSchema.methods.getResetToken = function() {
	const resetToken = crypto.randomBytes(20).toString('hex')

	this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex')
	this.resetPasswordExpire = Date.now() + 10 * (60 * 1000)

	return resetToken
}

const User = mongoose.model('User', UserSchema)

module.exports = User