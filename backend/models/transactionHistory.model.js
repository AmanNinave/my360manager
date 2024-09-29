import mongoose from "mongoose";

const transactionHistorySchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
    },
    transactions : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Transaction",
            default : []
        }
    ]
}, { timestamps : true })


const TransactionHistory = mongoose.model("TransactionHistory" , transactionHistorySchema );

export default TransactionHistory;