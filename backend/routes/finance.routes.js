import express from "express";
import { addTransaction, deleteTransaction, editTransaction, getTransactions } from "./../controllers/transaction.controllers.js";
import protectRoute from "../middlewares/protectRoute.js";
const financeRouter = express.Router();


financeRouter.post("/addtransaction" , protectRoute , addTransaction );

financeRouter.get("/gettransactions" , protectRoute , getTransactions );

financeRouter.put('/edittransaction/:id', editTransaction); // Edit transaction

financeRouter.delete('/deletetransaction/:id', deleteTransaction); // Delete transaction


export default financeRouter;