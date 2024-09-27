import express from "express";
import { addTransaction } from "./../controllers/transaction.controllers.js";
import protectRoute from "../middlewares/protectRoute.js";
const financeRouter = express.Router();


financeRouter.post("/addtransaction" , protectRoute , addTransaction );


export default financeRouter;