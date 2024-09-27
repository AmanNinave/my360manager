import express from "express";
import { addTransaction, getTransactions } from "./../controllers/transaction.controllers.js";
import protectRoute from "../middlewares/protectRoute.js";
const financeRouter = express.Router();


financeRouter.post("/addtransaction" , protectRoute , addTransaction );

financeRouter.get("/gettransactions" , protectRoute , getTransactions );


export default financeRouter;