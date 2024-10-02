import mongoose from "mongoose";

const accountSchema = new mongoose.Schema({
    fullName :{
        type : String,
    },
    bankName :{
        type : String,
    },
    accountNumber :{
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