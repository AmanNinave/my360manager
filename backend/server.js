import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import connectToDatabase from "./db/connectToDatabase.js";

import authRoutes from './routes/auth.routes.js'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000 ;

app.use(express.json());                    // to parse incomming requests with JSON payloads ( from req.body );
app.use(cookieParser());
app.use("/api/auth" , authRoutes );

app.get("/" , (req , res )=>{
    res.send("home page is here");
}) 


connectToDatabase().then(()=>{
    app.listen( PORT , ()=>{
        console.log("Server running on " + PORT );
    })
})