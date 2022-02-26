const ErrorResponse = require('../utils/errorResponse')


module.exports = {
	getTodos: async (req, res, next) => {
		const { username, _id, email } = req.user
		try{
			res.status(200).json({
				username,
				id: _id,
				email
			})
		}catch(err){
			next(err)
		}
	},
	postTodo: async (req, res, next) =>{
		const { username, _id, email } = req.user
		const { newTodo } = req.body
		console.log(newTodo)
		try{
			res.status(200).json({
				success: true,
				message: 'Todo successfully submitted'
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