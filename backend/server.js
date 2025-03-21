console.log('JAI SHREE RAM JI / JAI BAJARANG BALI JI')
const path = require('path')
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser') // Add this
require('colors')
require('dotenv').config()
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const PORT = process.env.PORT || 5000

// Connect to database
connectDB()

const app = express()

// CORS configuration
app.use(
  cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true, // Allow credentials
    allowedHeaders: ['Content-Type', 'Authorization'], // Add required headers
  })
)

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser()) // Add cookie parser middleware

// Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/tickets', require('./routes/ticketRoutes'));
app.use('/api/admin', require('./routes/adminRoutes.routes'));
app.use(errorHandler)
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))






// Serve Frontend
// if (process.env.NODE_ENV === 'production') {
//   // Set build folder as static
//   app.use(express.static(path.join(__dirname, '../frontend/build')))

//   // FIX: below code fixes app crashing on refresh in deployment
//   app.get('*', (_, res) => {
//     res.sendFile(path.join(__dirname, '../frontend/build/index.html'))
//   })
// } else {
//   app.get('/', (_, res) => {
//     res.status(200).json({ message: 'Welcome to the Support Desk API' })
//   })
// }
