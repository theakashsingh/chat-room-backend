import express  from "express";
import dotenv from "dotenv"
import { connectDB } from "./config/db.js";
import userRoutes from "./routes/userRoutes.js"
import chatRoutes from "./routes/chatRoutes.js"
import messageRoutes from "./routes/messageRoutes.js"
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

dotenv.config()

connectDB()
const app = express()
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("API Connecting")
})

app.use("/api/user",userRoutes)
app.use("/api/chat",chatRoutes)
app.use("/api/message",messageRoutes)
app.use(notFound)
app.use(errorHandler)


const port = process.env.PORT || 5000
app.listen(5000,console.log("Har Har Mahadev"))