import mongoose from "mongoose";

const lendBorrowSchema = new mongoose.Schema({
    userId :{
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    type : {
        type : String,
        required : true,
        emum : [ "Lend" , "Borrow" ]
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


const message = mongoose.model("LendBorrow" ,lendBorrowSchema );

export default message;