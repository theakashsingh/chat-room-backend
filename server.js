import express  from "express";
import dotenv from "dotenv"
import {chats}  from "./data/data.js";

dotenv.config()

const app = express()

app.get("/",(req,res)=>{
    res.send("API Connecting")
})

app.get("/api/chat",(req,res)=>{
    res.send(chats)
})


const port = process.env.PORT || 5000
app.listen(5000,console.log("Har Har Mahadev"))