import express from "express";
import { addTransaction, deleteTransaction, editTransaction, getTransactions } from "../controllers/transaction.controllers.js";
import protectRoute from "../middlewares/protectRoute.js";
const transactionRouter = express.Router();


transactionRouter.post("/addtransaction" , protectRoute , addTransaction );

transactionRouter.get("/gettransactions" , protectRoute , getTransactions );

transactionRouter.put('/edittransaction/:id', protectRoute , editTransaction); // Edit transaction

transactionRouter.delete('/deletetransaction/:id', protectRoute , deleteTransaction); // Delete transaction


export default transactionRouter;