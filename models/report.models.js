const mongoose = require('mongoose');

const reportSchema =  new mongoose.Schema({

    height : {
        type : Number
    }, 
    weight : {
        type : Number
    },
    bloodPressure : {
        type : Number
    },
    sugarLevel : {
        type : Number
    },
    tempreature : {
        type : Number
    },
    symptoms  : {
        type : String
    },
    userId : {
        type : mongoose.SchemaTypes.ObjectId,
        ref : "User"
    }
},{
    timestamps : true, versionKey : false
});

module.exports = mongoose.model("Report", reportSchema);