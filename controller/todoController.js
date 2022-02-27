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
		const todo = req.params.id
		try{
			await Todo.findOneAndDelete({user: _id, _id: todo })
			res.status(200).json({
				todo,
			})
		}catch(err){
			next(err)
		}
	},
	putTodo: async (req, res, next) => {
		const { _id } = req.user 
		const { todo } = req.body
		try{
			await Todo.findOneAndUpdate({ _id: todo._id }, { complete: `${todo.complete == false ? true : false}` })
			res.status(200).json({
				todo,
			})
		}catch(err){
			next(err)
		}
	}
}