const express = require('express')
const cors = require('cors')
require('dotenv').config()
const connectDB = require('./config/db')
const cookieParser = require('cookie-parser')

const authRoutes = require('./routes/authRoutes')
const productRoutes = require('./routes/productRoutes')

const app = express()
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())


app.use("/auth", authRoutes)
app.use("/product", productRoutes)

const PORT = 8000 || process.env.PORT

connectDB()

app.listen(PORT, ()=>{
    console.log("Server running")
})