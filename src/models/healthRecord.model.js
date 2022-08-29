
const mongoose = require("mongoose");
const { healRecordStatuses } = require("../utils/constants");

 
const orderSchema = new mongoose.Schema(
    {
        weight : {
            type : String,
            required : true
        },
        height : {
            type : String,
            required : true
        },
        bloodPressure : {
            type : String,
            required : true
        },
        sugerLevel : {
            type : String,
            required : true
        },
        temperature : {
            type : String,
            required : true
        },
        symptoms : {
            type : String,
            required : true
        },
        userId : {
            type : mongoose.SchemaTypes.ObjectId,
            required : true
        },
        status : {
            type : String,
            default : healRecordStatuses.active.at,
            enums : [healRecordStatuses.active, healRecordStatuses.inactive]
        }
        
    }, { timestamps: true, versionKey: false }

)

module.exports = mongoose.model("healthRecord", orderSchema);