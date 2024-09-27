import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from 'cors'

import connectToDatabase from "./db/connectToDatabase.js";

import authRoutes from './routes/auth.routes.js'
import financeRoutes from './routes/finance.routes.js'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000 ;

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));

app.use(express.json());                    // to parse incomming requests with JSON payloads ( from req.body );
app.use(cookieParser());
app.use("/api/auth" , authRoutes );
app.use("/api/finance" , financeRoutes)

app.get("/" , (req , res )=>{
    res.send("home page is here");
}) 


connectToDatabase().then(()=>{
    app.listen( PORT , ()=>{
        console.log("Server running on " + PORT );
    })
})