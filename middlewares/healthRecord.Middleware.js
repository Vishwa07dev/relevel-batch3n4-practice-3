const HealthRecord = require("../models/healthRecord.model");


const isValideOrderParamsId = async (req, res, next) => {
    try {
        const healthRecord = await HealthRecord.findOne({$and : [{_id : req.params.id}, {isDeleted : false}]});

        if(!healthRecord){
            return res.status(400).send({
                message : `Health Record id ${req.params.id} is not available in your record.`
            })
        }
        next();
    }
    catch(err){
        return res.status(500).send({
            message : `Internal error : ${err}`
        })
    }
}

module.exports = {isValideOrderParamsId};