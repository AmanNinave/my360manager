import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName :{
        type : String,
        required : true
    },
    username :{
        type : String,
        required : true,
        unique : true
    },
    email :{
        type : String,
        required : true,
        unique : true
    },
    password :{
        type :String,
        required : true,
        minlength : 6
    },
    gender :{
        type : String,
        required : true,
        emum : [ "male" , "female" , "Other" ]
    },
    profilePic : {
        type : String , 
        default : ""
    },
    defaultSender : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Account",
    },
    defaultReceiver : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Account",
    }

}, {timestamps : true });


const user = mongoose.model("User" , userSchema );

export default user;