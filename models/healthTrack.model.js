const mongoose = require("mongoose");
const { HealthTrackStatus } = require("../utils/constant");
const HealthTrackSchema = new mongoose.Schema({
        weight: {
            type: String,
            required: true,
        },
        height: {
            type: String,
            required: true,
        },
        bloodpresure: {
            type: String,
            reqiured: true,
        },
        sugerlevel: {
            type: String,
            required: true,
        },
        temperature: {
            type: Srting,
            required: true,
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
            default: healRecordStatuses.active.at,
            enums: [healRecordStatuses.active, healRecordStatuses.inactive]
        }

    }, { timestamps: true, versionKey: false }

)

module.exports = mongoose.model("healthTrack", HealthTrackSchema);