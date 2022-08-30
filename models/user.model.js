const mongoose = require("mongoose");
const { userType, userStatus } = require("../Utils/constant");
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,

    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        minLength: 5,
    },
    userId: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        unique: true,
        minlength: 10,

    },
    userType: {
        type: String,
        default: userType.user,
        enum: [userType.admin, userType.user],
    },
    userStatus: {
        type: String,
        default: userstatuses.approved,
        enum: [
            userstatuses.approved,
            userstatuses.banned
        ],
    },
    healthTrack: {
        type: [mongoose.SchemaTypes.ObjectId],
        ref: "healthTrack",
    },
}, {
    timestamps: true,
    versionKey: false
});
module.exports = mongoose.model("User", userSchema);