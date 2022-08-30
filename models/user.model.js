const mongoose = require('mongoose');
const constants = require('../utils/constants');

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    username: {
        type : String,
        trim: true,
        required : true,
        unique : true
    },
    password: {
        type : String,
        trim: true,
        minLength: 10,
        required : true
    },
    email: {
        type : String,
        trim: true,
        required : true,
        lowercase : true,
        minLength : 10,
        unique : true
    },
    userType : {
        type : String,
        required : true,
        default : constants.userTypes.customer,
        enum : [constants.userTypes.customer, constants.userTypes.admin]
    },
    reports : {
        type : [mongoose.SchemaTypes.ObjectId],
        default : [],
        ref : "report"
    }
},
{ timestamps: true, versionKey: false }
);

module.exports = mongoose.model("user",userSchema);