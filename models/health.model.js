const mongoose = require("mongoose");

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
        }
    },
    { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("Health", healthSchema);