const HealthRecord = require("../models/healthRecord.model");
const User = require("../models/user.model");
const constants = require("../utils/constants");

exports.createHealthRecord = async (req, res) => {
    try{
        const healthObj = {
            userId : req.userId,
            height : req.body.height,
            weight : req.body.weight,
            bloodPressure : req.body.bloodPressure,
            sugarLevel : req.body.sugarLevel,
            symptoms : req.body.symptoms,
        }
    
        const createRecord = await HealthRecord.create(healthObj);
        if(createRecord){
            const user = await User.findOne({userId : createRecord.userId});
            user.healthRecords.push(createRecord._id);
            await user.save();
        }
    
        return res.status(200).send(createRecord);
    }
    catch(err){
        return res.status(500).send({
            message : `Internal server error while creating a health record : ${err}`
        })
    }
};

exports.updateHealthRecord = async (req, res) => {
    try{
        const healthRecord = await HealthRecord.findOne({_id : req.params.id});

        healthRecord.height = req.body.height ? req.body.height : healthRecord.height;
        healthRecord.weight = req.body.weight ? req.body.weight : healthRecord.weight;
        healthRecord.bloodPressure = req.body.bloodPressure ? req.body.bloodPressure : healthRecord.bloodPressure;
        healthRecord.sugarLevel = req.body.sugarLevel ? req.body.sugarLevel : healthRecord.sugarLevel;
        healthRecord.symptoms = req.body.symptoms ? req.body.symptoms : healthRecord.symptoms;
    
        const updatedHealthRecord = await healthRecord.save();
        return res.status(200).send(updatedHealthRecord);
    }
    catch(err){
        return res.status(500).send({
            message : `Internal server error while updating the health record : ${err}`
        }) 
    }
};

exports.deleteHealthRecord = async (req, res) => {
    try{
        const healthRecord = await HealthRecord.findOne({_id : req.params.id});

        healthRecord.isDeleted = true;
        await healthRecord.save();
    
        return res.status(201).send({
            message : `Your health record ${req.params.id} has been deleted succefully.`
        });
    }
    catch(err){
        return res.status(500).send({
            message : `Internal server error while deleting the health record : ${err}`
        }) 
    }
};

exports.getAllHealthRecord = async (req, res) => {
    try{
        const callingUser = await User.findOne({userId : req.userId});
        const healthRecord = callingUser.userType === constants.userTypes.customer
            ? await HealthRecord.find({$and : [{userId : callingUser.userId}, {isDeleted : false}]})
            : await HealthRecord.find({isDeleted : false});
        
        if(!healthRecord){
            return res.status(404).send({
                message : "No such record found."
            })
        }
    
        return res.status(200).send(healthRecord);
    }
    catch(err){
        return res.status(500).send({
            message : `Internal server error while getting all the health records : ${err}`
        }) 
    }
};

exports.getHealthRecordById = async (req, res) => {
    try{
        const callingUser = await User.findOne({userId : req.userId});
        const healthRecord = await HealthRecord.findOne({_id : req.params.id});
    
        if(!healthRecord){
            return res.status(404).send({
                message : `No records with id : ${req.params.id}.`
            })
        }
    
        if(callingUser.userType === constants.userTypes.customer && callingUser.userId !== healthRecord.userId){
            return res.status(401).send({
                message : `You are neither the owner of the health record ${healthRecord._id} not the admin of Health_Service_App.`
            })
        }
    
    
        return res.status(201).send(healthRecord); 
    }
    catch(err){
        return res.status(500).send({
            message : `Internal server error while getting the health record by id : ${err}`
        }) 
    }
}