const ErrorResponse = require('../utils/errorResponse')
const Todo = require('../models/Todo')

module.exports = {
	getTodos: async (req, res, next) => {
		const { username, _id, email } = req.user
		try{
			const todos = await Todo.find({
				user: _id
			})

			if(!todos) next(new ErrorResponse('Could not fetch todos', 404))

			res.status(200).json({
				success: true,
				todos,
			})
		}catch(err){
			next(err)
		}
	},
	postTodo: async (req, res, next) =>{
		const { username, _id, email } = req.user
		const { newTodo } = req.body
		try{
			const todo = await Todo.create({
				user: _id,
				todo: newTodo,
				complete: false
			})

			res.status(200).json({
				success: true,
				message: 'Todo successfully submitted',
				todo,
			})
		}catch(err){
			next(err)
		}
	},
	deleteTodo: async (req, res, next) => {
		const { username, _id, email } = req.user
		const { newTodo } = req.body
		console.log(newTodo)
		try{
			res.status(200).json({
				username,
				id: _id,
				email
			})
		}catch(err){
			next(err)
		}
	}
}