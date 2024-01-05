import express from 'express'
import cors from 'cors'
import connectDB from './Database/dbconfig.js'
import productrouter from './Router/item.router.js'
import dotenv from 'dotenv'
dotenv.config()

const port=process.env.PORT
const app=express()

app.use(express.json())
app.use(cors())

app.use('/api',productrouter)

connectDB()



app.listen(port,()=>{
    console.log("My App is listening port",port);
})