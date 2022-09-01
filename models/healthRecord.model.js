const mongoose = require("mongoose");
const constants = require("../utils/constants");

const healthRecordSchema = new mongoose.Schema({
    height : {
        type : Number,
    },
    weight : {
        type : Number,
    },
    bloodPressure : {
        type : Number,
    },
    sugarLevel : {
        type : Number,
    },
    temperature : {
        type : Number,
    },
    symptoms : {
        type : [mongoose.SchemaTypes.String],
    },
    userId : {
        type : String,
        required : true
    },
    isDeleted : {
        type : Boolean,
        default : false,
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

module.exports = mongoose.model("HealthRecord", healthRecordSchema);