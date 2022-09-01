const healthRecord = require('../models/healthRecord.model')
const constants = require('../utils/constants');
const sendResponse = require('../utils/objectConverter')

exports.createNewRecord = async (req,res)=>{
    try{
        const data = {
            customerId : req.user.userType == constants.userTypes.admin ? req.body.customerId : req.user._id,
            height : req.body.height,
            weight : req.body.weight,
            bloodPressure : req.body.bloodPressure,
            sugerLevel : req.body.sugerLevel,
            temprature : req.body.temprature,
            symptoms : req.body.symptoms
        }
    
        const record = await healthRecord.create(data);
        const customer = req.user.userType == constants.userTypes.admin ? req.customer : req.user;
        customer.healthRecords.push(record._id);
        await customer.save();
        
        console.log(`#### New health record submitted by ${req.user.userType} ${req.user.name} ####`);
        res.status(201).send(sendResponse.sendRecord(record));


    }catch(err){
        console.log("#### Error while submitting new health record #### ", err.message);
        res.status(500).send({
            message : "Internal server error while submitting new health record"
        });
    }
}


exports.editHealthRecord = async (req,res)=>{
    try{
        const record = req.recordInParams;

        record.height = req.body.height ? req.body.height : record.height,
        record.weight = req.body.weight ? req.body.weight : record.weight,
        record.bloodPressure = req.body.bloodPressure ? req.body.bloodPressure : record.bloodPressure,
        record.sugerLevel = req.body.sugerLevel ? req.body.sugerLevel : record.sugerLevel,
        record.temprature = req.body.temprature ? req.body.temprature : record.temprature
        record.symptoms = req.body.symptoms ? req.body.symptoms : record.symptoms

        const updatedRecord = await record.save();

        console.log(`#### Health record data updated by ${req.user.userType} ${req.user.name} ####`);
        res.status(200).send(sendResponse.sendRecord(updatedRecord));

    }catch(err){
        console.log("#### Error while updating health record data #### ", err.message);
        res.status(500).send({
            message : "Internal server error while updating health record data"
        });
    }
}

exports.deleteHealthRecord = async (req,res)=>{
    try{
        const record = req.recordInParams;

        record.deleted = true

        await record.save();

        console.log(`#### Health record deleted by ${req.user.userType} ${req.user.name} ####`);
        res.status(200).send({message : "Health record deleted"});

    }catch(err){
        console.log("#### Error while deleting health record #### ", err.message);
        res.status(500).send({
            message : "Internal server error while deleting health record"
        });
    }
}


exports.getAllHealthRecords = async (req,res)=>{
    try{
        const user = req.user;
        const userRecords = user.healthRecords;
        let queryObj = {}
    
        if(user.userType == constants.userTypes.customer){
    
            if(!userRecords){
                return res.status(200).send({
                    message : "No records submitted by the user yet"
                });
            }

            queryObj = {$and: [{"_id" : {$in : userRecords}},{"deleted" : false}]}
    
        }else {
            queryObj = {"deleted" : false}    
        }
    
        const records = await healthRecord.find(queryObj);
    
        res.status(200).send(sendResponse.sendAllRecords(records));
    
    }catch(err){
        console.log("#### Error while getting all health records ####", err.message);
        res.status(500).send({
            message : "Internal server error while getting all health records"
        })
    }
}

exports.getSingleHealthRecord = (req,res)=>{
    const record = req.recordInParams;

    res.status(200).send(sendResponse.sendRecord(record));
}
