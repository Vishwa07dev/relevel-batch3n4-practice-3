const mongoose = require("mongoose");
const { HealthTrackStatus } = require("../utils/constant");
const HealthTrackSchema = new mongoose.Schema({
        weight: {
            type: Number,
            required: true,
        },
        height: {
            type: Number,
          
        },
        bloodpresure: {
            type: Number,
          
        },
        sugerlevel: {
            type: String,
            required: true,
        },
        temperature: {
            type: Number,
          
        },
        symptoms: {
            type: String,
            required: true
        },
        userId: {
            type: mongoose.SchemaTypes.ObjectId,
            required: true
        },
        status: {
            type: String,
            default: healRecordStatuses.active,
            enums: [healRecordStatuses.active, healRecordStatuses.inactive]
        }

    }, { timestamps: true, versionKey: false }

)

module.exports = mongoose.model("healthTrack", HealthTrackSchema);
