const Report = require('../models/report.models');
const User = require('../models/user.models');

exports.createReport = async (req, res)=>{
    try{
        const user = await User.findOne({userId : req.userId})
        console.log(user);
        let reportObj ={
            height : req.body.height,
            weight : req.body.weight,
            bloodPressure : req.body.bloodPressure,
            sugarLevel : req.body.sugarLevel,
            tempreature : req.body.tempreature,
            symptoms  : req.body.symptoms,
            userId : user._id
        }
        const report = await Report.create(reportObj);
        res.status(200).send({
            message : "Report Created Successfully",
            data : report
        })
        }catch(err){
        console.log("Some error while creating the report",err.message);
        res.status(500).send({
            message : "Some Internal Error"
        })
    }
}

exports.updateReport = async (req, res)=>{
    try{
        
        const report = await Report.findById(req.params.id);
        report.height = (req.body.height) ? req.body.height : report.height;
        report.weight = (req.body.weight)? req.body.weight : report.weight;
        report.bloodPressure = (req.body.bloodPressure) ? req.body.bloodPressure : report.bloodPressure;
        report.sugarLevel = (req.body.sugarLevel) ? req.body.sugarLevel : report.sugarLevel;
        report.tempreature = (req.body.tempreature) ? req.body.tempreature : report.tempreature;
        report.symptoms = (req.body.symptoms) ? req.body.symptoms : report.symptoms;
        const updateReport = await report.save();
        res.status(200).send({
            message : "Report Updated Successfully",
            data : updateReport
        })
        }catch(err){
        console.log("Some error while creating the report",err.message);
        res.status(500).send({
            message : "Some Internal Error"
        })
    }
}

exports.deleteReport = async (req, res)=>{
    try{
        
        const report = await Report.findByIdAndDelete(req.params.id);

        res.status(200).send({
            message : "Report Delete Successfully",
        })
        }catch(err){
        console.log("Some error while creating the report",err.message);
        res.status(500).send({
            message : "Some Internal Error"
        })
    }
}