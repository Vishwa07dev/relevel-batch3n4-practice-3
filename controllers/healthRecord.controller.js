const Health = require("../models/healthRecord.model");
const User = require("../models/user.model");

exports.createHealthRecord = async (req, res) => {
    try{
        const healthObj = {
            userId : req.body.userId,
            height : req.body.height,
            weight : req.body.weight,
            bloodPressure : req.body.bloodPressure,
            sugarLevel : req.body.sugarLevel,
            symptoms : req.body.symptoms,
        }
    
        const createRecord = await Health.create(healthObj);
        if(placedOrder){
            const user = await User.findOne({userId : createRecord.userId});
            user.healthRecords.push(createRecord._id);
            await user.save();
        }
    
        return res.status(200).send({
            userId : createRecord.userId,
            height : createRecord.height,
            weight : createRecord.weight,
            bloodPressure : createRecord.bloodPressure,
            sugarLevel : createRecord.sugarLevel,
            symptoms : createRecord.symptoms,
        })
    }
    catch(err){
        return res.status(500).send({
            message : `Internal server error while creating a health record : ${err}`
        })
    }
};

exports.updateHealthRecord = async (req, res) => {
    try{
        const healthRecord = await Health.findOne({_id : req.params.id});

        healthRecord.height = req.body.height ? req.body.height : healthRecord.height;
        healthRecord.weight = req.body.weight ? req.body.weight : healthRecord.weight;
        healthRecord.bloodPressure = req.body.bloodPressure ? req.body.bloodPressure : healthRecord.bloodPressure;
        healthRecord.sugarLevel = req.body.sugarLevel ? req.body.sugarLevel : healthRecord.sugarLevel;
        healthRecord.symptoms = req.body.symptoms ? req.body.symptoms : healthRecord.symptoms;
    
        const updatedHealthRecord = await healthRecord.save();
        return res.status(201).send(updatedHealthRecord);
    }
    catch(err){
        return res.status(500).send({
            message : `Internal server error while updating the health record : ${err}`
        }) 
    }
};

exports.deleteHealthRecord = async (req, res) => {
    try{
        const healthRecord = await Health.findOne({_id : req.params.id});
        const user = await User.findOne({userId : healthRecord.userId});

        user.healthRecords = user.healthRecords.filter(record => record._id !== healthRecord._id);
        await user.save();
    
        return res.status(201).send({
            message : `Your health record ${req.params.id} has been deleted from the list succefully.`
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
            ? await Health.find({userId : callingUser.userId})
            : await Health.find({});
        
    
        if(!healthRecord){
            return res.status(404).send({
                message : "No records yet."
            })
        }
    
        return res.status(201).send(healthRecord);
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
        const healthRecord = await Health.findOne({});
    
    
        if(callingUser.userType === constants.userTypes.customer && callingUser.userId !== healthRecord.userId){
            return res.status(401).send({
                message : `You are not the owner of the health record ${healthRecord._id}`
            })
        }
    
        if(!healthRecord){
            return res.status(404).send({
                message : "No records yet."
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