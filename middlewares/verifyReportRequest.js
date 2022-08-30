const Report = require('../models/report.model');
const constants = require('../utils/constants');

const isValidReportIdInReqParam = async (req,res,next)=>{

    try{

        const data = await Report.findOne({_id : req.params.id});

        if(!data){
            return res.status(400).send({
                message : "Report id provided does not match any reports"
            })
        }
        if(data.deleted == true){
            return res.status(400).send({
                message : "Report has been deleted"
            })
        }
        req.ReportInParams = data;

        next();
        
    }catch(err){
        console.log("#### Error while reading the report info #### ", err.message);
        return res.status(500).send({
            message : "Internal server error while reading the report data"
        })
    }
}


const validateNewReportBody = async (req,res,next)=>{
    try{
        if (req.user.userType == constants.userTypes.admin && !req.body.customerId) {
            return res.status(400).send({
                message: "Failed ! CustomerID is not provided"
            });
        }
    
        next();

    }catch{
        console.log("#### Error while velidating new report body ##### ", err.message);
        res.status(500).send({
            message : "Internal server error while report validation"
        });
    }
}

const validateReportUpdateBody = async (req,res,next)=>{
    try{
        
        if(req.user.userType == constants.userTypes.admin || req.jobInParams.customerId == req.user._id){
            next();
        }else{
            return res.status(403).send({
                message : "Unauthorised!"
            });
        }
    }catch{
        console.log("#### Error while validating updated report body ##### ", err.message);
        res.status(500).send({
            message : "Internal server error while report update validation"
        });
    }
}


const verifyJobRequestBodies = {
    isValidReportIdInReqParam,
    validateNewReportBody,
    validateReportUpdateBody
};

module.exports = verifyJobRequestBodies