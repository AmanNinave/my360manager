import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from 'cors'
import path from 'path'

import connectToDatabase from "./db/connectToDatabase.js";

import authRoutes from './routes/auth.routes.js'
import transactionRoutes from './routes/transactions.routes.js'
import accountRoutes from "./models/account.model.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000 ;

const __dirname = path.resolve();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));

app.use(express.json());                    // to parse incomming requests with JSON payloads ( from req.body );
app.use(cookieParser());
app.use("/api/auth" , authRoutes );
app.use("/api/finance" , transactionRoutes)
app.use("/api/finance/accounts" , accountRoutes)

app.use(express.static(path.join(__dirname, "/frontend/dist")))

app.get("*" , ( req , res ) => {
    res.sendFile(path.join(__dirname , "frontend" , "dist" , "index.html"));
})

connectToDatabase().then(()=>{
    app.listen( PORT , ()=>{
        console.log("Server running on " + PORT );
    })
})