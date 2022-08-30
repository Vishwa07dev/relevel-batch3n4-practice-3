const mongoose = require("mongoose");
const constants = require('../utils/constants')

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            unique: true,
            minLength: 5,
        },
        userId: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            trim: true,
            minLength: 10,
        }, 
        healthReports : {
            type : [mongoose.SchemaType.ObjectId],
            ref : "Health"
        },
        userType : {
            type : String,
            default : constants.userType.customer,
            enum : [constants.userType.customer, constants.userType.admin]
        }
    },
    { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("User", userSchema);