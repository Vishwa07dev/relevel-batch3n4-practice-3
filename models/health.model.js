const mongoose = require("mongoose");
const constants = require('../utils/constants')

const healthSchema = new mongoose.Schema(
    {
        customerId: {
            type: mongoose.SchemaTypes.ObjectId,
            required: true,
            ref: "User"
        },
        height: {
            type: String,
            required: true,
            trim: true,
        },
        weight: {
            type: String,
            required: true,
            trim: true
        },
        bloodPressure: {
            type: String,
            required: true,
            trim: true
        },
        temparature: {
            type: String,
            required: true,
            trim: true
        },
        sugerLevel: {
            type: String,
            required: true
        },
        symptoms: {
            type: [String]
        },
        // healthStatus: {
        //     type: String,
        //     default : constants.healthStatus.fit,
        //     enum : [constants.healthStatus.fit, constants.healthStatus.unfit]
        // }
    },
    { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("Health", healthSchema);