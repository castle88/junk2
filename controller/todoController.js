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
	}
}