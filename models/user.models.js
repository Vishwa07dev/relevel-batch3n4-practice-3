const mongoose=require("mongoose");
const constants=require("../utils/constant")
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        minLength:10
    },
    password:{
        type:String,
        required:true
    },
    userType:{
        type:String,
        default:constants.userType.customer,
        enum:[constants.userType.admin,constants.userType.customer]
    },
    userStatus:{
        type:String,
        default:constants.userStatus.approved,
        enum:[constants.userStatus.approved,constants.userStatus.pending,constants.userStatus.rejected]
    },
    createdAt:{
        type:Date,
        immutable:true,
        default:()=>{
            return Date.now();
        }
    },
    updatedAt:{
        type:Date,
        default:()=>{
            return Date.now();
        }
    },
    healthTracker:{
        type:[mongoose.SchemaTypes.ObjectId],
        ref:"healthTracker"
    }


},{timestamps:true,versionKey:false})

module.exports=mongoose.model("user",userSchema)