const { isAdmin } = require('../middlewares/authJwt');
const healthRecord = require('../models/healthRecord.model');

exports.createHealthrecord = async (req, res) => {

    try {

        const orderObj = {
            weight : req.body.weight,
            height : req.body.height,
            bloodPressure : req.body.bloodPressure,
            sugerLevel : req.body.sugerLevel,
            tempearture : req.body.tempearture,
            symptoms : req.body.symptoms
        }

        const healthRecordCreated = await Order.create(orderObj);

        const user = req.user
        user.healthRecords.push(healthRecord._id);
        await user.save();

        res.status(201).send(healthRecordCreated);
    } catch (err) {
        console.log("Error while doing the DBb operations", err.message);
        res.status(500).send({
            message : "Internal server error"
        })
    }
}

exports.getAllhealthRecords = async (req, res) => {

    try {

        if(isAdmin){
            const queryObj = {};
            const healthRecordsCreated = req.user.healthRecords
            console.log("healthRecordsCreated", healthRecordsCreated)
            queryObj["_id"] = { $in: healthRecordsCreated};
        
            let healthRecords = await healthRecord.find(queryObj);
            healthRecords = await healthRecord.find();
            console.log("healthRecords", healthRecords);
            res.status(200) .send({
                yourHealthrecords : {
                    healthRecordsCreated
                },
                allhealrecords : {
                    healthRecords
                }
            }) 
        } else {
            const healthRecords = await healthRecord.find();
            res.status(200).send(healthRecords);
        }

    } catch (err) {

        console.log("some error while fetching all healrecords", err.message);
        res.status(500).send({
            message : "Some internal error "
        });
    }

}


exports.findByHealthRecordId = async (req, res) => {

    try {
        const healthRecord = await healthRecord.find({ "_id": req.params.id });
      
        return res.status(200).send(healthRecord);

    } catch (err) {
        console.log("Error while searching the healthRecord ", err);
        return res.status(500).send({
            message: "Internal Server Error"
        })
    }
}



exports.updatehealthRecord = async (req, res) => {
    try {
        const healthRecord = await healthRecord.findOne({"_id": req.params.id});

        healthRecord.weight = req.body.weight != undefined ? req.body.weight : healthRecord.weight;
        healthRecord.height = req.body.height != undefined ? req.body.height : healthRecord.height;
        healthRecord.bloodPressure = req.body.bloodPressure != undefined ? req.body.bloodPressure : healthRecord.bloodPressure;
        healthRecord.sugerLevel = req.body.sugerLevel != undefined ? req.body.sugerLevel : healthRecord.sugerLevel;
        healthRecord.tempearture = req.body.tempearture != undefined ? req.body.tempearture : healthRecord.tempearture;
        healthRecord.symptoms = req.body.symptoms != undefined ? req.body.symptoms : healthRecord.symptoms;
        
        const updatedhealthRecord = await healthRecord.save();

        res.status(200).send(updatedhealthRecord);

    } catch (err) {
        console.log("some error while updating healthRecord", err.message);
        res.status(500).send({
            message : "Some internal error while updating the healthRecord"
        })
    }
}