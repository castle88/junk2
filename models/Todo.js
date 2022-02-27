const mongoose = require('mongoose')

const TodoSchema = mongoose.Schema({
	user: {
		type: String,
		required: [true, 'Need to re login'],
	},
	todo: {
		type: String,
		required: [true, "Please submit a todo"]
	},
	complete: {
		type: Boolean,
		required: true
	}
})

const Todo = mongoose.model('Todo', TodoSchema)

module.exports = Todo