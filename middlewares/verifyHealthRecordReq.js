const User = require('../models/user.model')
const HealthRecord = require('../models/healthRecord.model');
const constants = require('../utils/constants');

const isValidRecordIdInReqParam = async (req,res,next)=>{

    try{

        const data = await HealthRecord.findOne({_id : req.params.id});

        if(!data){
            return res.status(400).send({
                message : "Health record id provided does not match any records"
            })
        }
        if(data.deleted == true){
            return res.status(400).send({
                message : "Health record has been deleted"
            })
        }
        req.recordInParams = data;

        next();
        
    }catch(err){
        console.log("#### Error while reading the health record info #### ", err.message);
        return res.status(500).send({
            message : "Internal server error while reading the health record data"
        })
    }
}


const validateNewRecordBody = async (req,res,next)=>{
    try{
        if (req.user.userType == constants.userTypes.admin) {
            if(!req.body.customerId){
                return res.status(400).send({
                    message: "Failed ! CustomerID is not provided"
                });
            }else{
                customer = await User.findOne({_id : req.body.customerId});
                if(!customer){
                    return res.status(400).send({
                        message: "Failed ! CustomerID is provided does not exist"
                    });
                }
                req.customer = customer
            }
        }
    
        next();

    }catch{
        console.log("#### Error while velidating new record body ##### ", err.message);
        res.status(500).send({
            message : "Internal server error while record validation"
        });
    }
}

const isAdminOrOwner = (req,res,next)=>{
    
    if(req.user.userType == constants.userTypes.admin || req.recordInParams.customerId.equals(req.user._id)){
        next();
    }else{
        return res.status(403).send({
            message : "Only admin or owner is allowed to make this call"
        })
    }
}

const verifyHealthRecordRequestBodies = {
    isValidRecordIdInReqParam,
    validateNewRecordBody,
    isAdminOrOwner
};

module.exports = verifyHealthRecordRequestBodies