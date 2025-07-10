import './config/instrument.js'
import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/db.js'
import * as Sentry from '@sentry/node'

// Initialize express
const app = express()

// Middleware
app.use(express.json())
app.use(cors())

// Connect to database
await connectDB()

// Routes
app.get('/', (req, res) => res.send("API Working"))
app.get("/debug-sentry", function mainHandler(req, res){
    throw new Error("First sentry error");
    
});

// Port
const PORT = process.env.PORT || 9000
Sentry.setupExpressErrorHandler(app);

app.listen(PORT, () => {
    console.log(`Server is running on the port ${PORT}`)
})