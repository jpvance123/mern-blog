const express = require('express')
const colors = require('colors')
const cors = require('cors')
const { errorHandler } = require('./middleware/errorMiddleware')
require('dotenv').config()

// Connect to DB
connectDB = require('./config/db')
connectDB()

// INIT App
const PORT = process.env.PORT || 5001
const app = express()


// Middleware
app.use(express.json({ limit: '50mb', extended: true}))
app.use(express.urlencoded({ limit: '50mb', extended: true }))
app.use(cors())

app.use('/api/v1/blog', require('./routes/blogPosts.routes'))
app.use('/api/v1/Auth', require('./routes/user.routes'))
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})