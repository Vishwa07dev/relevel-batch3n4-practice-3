const mongoose=require("mongoose")

const healtSchema=new mongoose.Schema({
    height:{
        type:String,
        required:true
    },
    weight:{
        type:String,
        required:true
    },
    bloodPressure:{
        type:Number,
        required:true
    },
    sugarLevel:{
        type:Number,
        required:true
    },
    temperature:{
        type:Number,
        required:true
    },
   symptoms:{
        type:[String],
        required:true
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
    userId:{
        type:String,
        required:true
    }
},{timestamps:true,versionKey:false})


module.exports=mongoose.model("healthTracker",healtSchema)