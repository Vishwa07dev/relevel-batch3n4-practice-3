const Report = require('../models/report.model')
const constants = require('../utils/constants');

exports.createReport = async (req,res)=>{
    try{
        const data = {
            customerId : req.user.userType == constants.userTypes.admin ? req.body.customerId : req.user._id,
            height : req.body.height,
            weight : req.body.weight,
            bloodPressure : req.body.bloodPressure,
            sugerLevel : req.body.sugerLevel,
            temprature : req.body.temprature,
        }
    
        const report = await Job.create(data);

        const customer = req.user;

        customer.reports.push(report._id);
        await customer.save();
        
        console.log(`#### New Report submitted by ${customer.name} ####`);
        res.status(201).send(report);


    }catch(err){
        console.log("#### Error while submitting new report #### ", err.message);
        res.status(500).send({
            message : "Internal server error while submitting new report"
        });
    }
}


exports.editReport = async (req,res)=>{
    try{
        const report = req.reportInParams;

        report.height = req.body.height ? req.body.height : report.height,
        report.weight = req.body.weight ? req.body.weight : report.weight,
        report.bloodPressure = req.body.bloodPressure ? req.body.bloodPressure : report.bloodPressure,
        report.sugerLevel = req.body.sugerLevel ? req.body.sugerLevel : report.sugerLevel,
        report.temprature = req.body.temprature ? req.body.temprature : report.temprature

        const updatedReport = await report.save();

        console.log(`#### Report data updated by ${req.user.userType} ${req.user.name} ####`);
        res.status(200).send(updatedReport);

    }catch(err){
        console.log("#### Error while updating report data #### ", err.message);
        res.status(500).send({
            message : "Internal server error while updating report data"
        });
    }
}

exports.deleteReport = async (req,res)=>{
    try{
        const report = req.reportInParams;

        report.deleted = true

        await report.save();

        console.log(`#### Report deletedd by ${req.user.userType} ${req.user.name} ####`);
        res.status(200).send({message : "Report deleted"});

    }catch(err){
        console.log("#### Error while deleting report #### ", err.message);
        res.status(500).send({
            message : "Internal server error while deleting report"
        });
    }
}


exports.getAllReports = async (req,res)=>{
    try{
        const user = req.user;
        const userReports = user.reports;
        const queryObj = {}
    
        if(user.userType == constants.userTypes.customer){
    
            if(!userReports){
                return res.status(200).send({
                    message : "No reports submitted by the user yet"
                });
            }

            queryObj = {$and: [{"_id" : {$in : reports}},{"deleted" : false}]}
    
        }else {
            queryObj = {"deleted" : false}    
        }
    
        const reports = await Report.find(queryObj);
    
        res.status(200).send(reports);
    
    }catch(err){
        console.log("#### Error while getting reports ####", err.message);
        res.status(500).send({
            message : "Internal server error while getting reports"
        })
    }
}

exports.getSingleReport = (req,res)=>{
    const report = req.reportInParams;

    if(report.deleted == true){
        return res.status(400).send({
            message : "This report was deleted"
        })
    }

    const reportObj = {
        customerId : report.customerId,
        height : report.height,
        weight : report.weight,
        bloodPressure : report.bloodPressure,
        sugerLevel : report.sugerLevel,
        temprature : report.temprature,
    }
    res.status(200).send(reportObj);
}
