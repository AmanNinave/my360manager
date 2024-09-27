import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    userId :{
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    type : {
        type : String,
        required : true,
        emum : [ "Income" , "Expenditure" ]
    },
    source : {
        type : String,
        required : true,
    },
    remark : {
        type : String,
        required : true,
    },
    debit : {
        type : Number,
        required : true,
    },
    credit : {
        type : Number,
        required : true,
    }
} , { timestamps : true });


const Transaction = mongoose.model("Transaction" ,transactionSchema );

export default Transaction;