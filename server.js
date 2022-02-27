const express = require('express')
require('dotenv').config({ path: './config/.env' })
const cors = require('cors')
const path = require('path')
const port = process.env.PORT || 3333
const connectDB = require('./config/database')
const errorHandler = require('./middleware/errorHandler')
const authRoutes = require('./routes/authRoutes')
const todoRoutes = require('./routes/todoRoutes')
const { protect } = require('./middleware/auth')

const app = express()

connectDB()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static(path.resolve('client', 'build')))
app.use(cors())

app.use('/api/auth', authRoutes)
app.use('/api/todos', protect, todoRoutes)

app.use(errorHandler)

app.get('*', (req, res)=> {
	res.sendFile(path.resolve('client', 'build', 'index.html'))
})

const server = app.listen(port, () => console.log(`Server running port: ${port}`))

process.on('unhandledRejection', (err, promise) => {
	console.log(`Logged error: ${err}`)
	server.close(() => process.exit(1))
})