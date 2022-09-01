const mongoose = require("mongoose");
const constants = require("../utils/constants");

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        trim : true,
    },
    email : {
        type : String,
        required : true,
        trim : true,
        lowercase : true,
        unique : true,
        minLength : 5,
    },
    userId : {
        type : String,
        required : true,
        trim : true,
        unique : true,
    },
    password : {
        type : String,
        required : true,
        trim : true,
        minLength : 10,
    },
    userType : {
        type : String,
        default : constants.userTypes.customer
    },
    healthRecords : {
        type : [mongoose.SchemaTypes.ObjectId],
        ref : "HealthRecord"
    },
    createdAt : {
        type : Date,
        immutable : true,
        default : () => Date.now()
    },
    updatedAt : {
        type : Date,
        default : () => Date.now()
    },
},{ timestamps : true, versionKey : false });

module.exports = mongoose.model("User", userSchema);