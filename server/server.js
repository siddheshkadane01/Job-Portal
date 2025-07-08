import express from 'express'
import cors from 'cors'
import 'dotenv/config'

//Initialize express
const app = express()

//Middleware
app.use(cors())
app.use(express,cors())
