const mongoose = require('mongoose')

const healthRecordSchema = new mongoose.Schema({
    customerId : {
        type : mongoose.SchemaTypes.ObjectId,
        ref : "user",
        required : true
    },
    height : {              //in cm
        type : Number
    },
    weight : {              //in kg
        type : Number
    },
    bloodPressure : {
        type : Number
    },
    sugerLevel : {
        type : Number
    },
    temprature : {      //in celcius
        type : Number
    },
    symptoms : {
        type : [String]
    },
    deleted : {
        type : Boolean,
        default : false
    }
},
{ timestamps: true, versionKey: false }
);

module.exports = mongoose.model("healthRecord",healthRecordSchema)