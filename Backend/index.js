import express from "express"
import cors from 'cors'
import {connectDB} from './Config/db.js'
import foodRouter from "./routes/foodRoute.js"
import userRouter from "./routes/userRoute.js"
import "dotenv/config"
import cartRouter from "./routes/cartRoute.js"


// App config
const app=express()
const port=4000


// Middleware
app.use(express.json()) // convert data coming from fronted into json
app.use(cors()) // using this we can access the backend from any frontend


// DB connection
connectDB();

app.get("/",(req,res)=>{
    res.send("API Working")

})

// Api endpoints
app.use("/api/food",foodRouter)
app.use("/images",express.static('uploads'))
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter)


app.listen(port,()=>{
    console.log(`Server Started on http://localhost:${port}`)
})

