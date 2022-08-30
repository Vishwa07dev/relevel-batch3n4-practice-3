const mongoose = require('mongoose');
const constants = require('../utils/constants');

const userSchema = new mongoose.Schema({

    name : {
        type : String,
        required : true,
    },
    userId : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
        lowercase : true,
        minLength : 10,
        unique : true
    },
    userType : {
        type : String,
        enum : [constants.userType.admin, constants.userType.customer],
        default : constants.userType.customer
    },
    reports : {
        type : [mongoose.SchemaTypes.ObjectId],
        ref : "Report"
    }
    
},{
    timestamps : true , versionKey : false
});

module.exports = mongoose.model("User", userSchema);