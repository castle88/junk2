const express = require('express')
require('dotenv').config({ path: './config/.env' })
const port = process.env.PORT || 3333
const connectDB = require('./config/database')
const errorHandler = require('./middleware/errorHandler')

const app = express()

connectDB()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())



app.use(errorHandler)

const server = app.listen(port, () => console.log(`Server running port: ${port}`))

process.on('unhandledRejection', (err, promise) => {
	console.log(`Logged error: ${err}`)
	server.close(() => process.exit(1))
})