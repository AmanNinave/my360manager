import mongoose from "mongoose";

const accountSchema = new mongoose.Schema({
    accountTitle :{
        type : String,
    },
    fullName :{
        type : String,
    },
    bankName :{
        type : String,
    },
    accountNumber :{
        type : String,
    },
    upiId :{
        type : String,
    },
    email :{
        type : String,
    },
    phoneNumber :{
        type :String,
    },
    description :{
        type : String,
    },
    image : {
        type : String, 
    }

}, {timestamps : true });


const account = mongoose.model("User" , accountSchema );

export default account;