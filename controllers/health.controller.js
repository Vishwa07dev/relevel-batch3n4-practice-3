const Health = require('../models/health.model');
const User = require('../models/user.model');
const constants = require('../utils/constants');



exports.createHealthTrackReport = async (req, res) => {

    try{
        const user = await User.findOne({userId : req.userId});

        const healthObj = {
            customerId : user._id,
            height : req.body.height,
            weight : req.body.weight,
            bloodPressure : req.body.bloodPressure,
            temparature : req.body.temparature,
            sugerLevel : req.body.sugerLevel,
            symptoms : req.body.symptoms
        }

        const HealthReport = await Health.create(healthObj);
        
        user.healthReports.push(HealthReport._id);
        await user.save()

        res.status(201).send(HealthReport);

    }catch(err){
        console.log("Error while create report : ", err.message);
        res.status(500).send({
            message : "Internal Server Error"
        })
    }
};

exports.deleteHealthTrackReport = async (req, res) => {

    try{

        const user = await User.findOne({userId : req.userId});

        await Health.deleteOne({_id : req.params.id})

        let allReport = user.healthReports;

        for(let i=0; i<allReport.length; i++){
            if(allReport[i] == (req.params.id)){
                allReport.splice(i, 1)
            }
        }
        await user.save()

        res.status(200).send({
            message : "Successfully deleted"
        });

    }catch(err){
        console.log("Error while update report : ", err.message);
        res.status(500).send({
            message : "Internal Server Error"
        })
    }
};

exports.updateHealthTrackReport = async (req, res) => {

    try{
        const report  = await Health.findOne({_id : req.params.id});
        const user = await User.findOne({userId : req.userId});
        
        if(user.userType == constants.userType.admin){
        
            report.bloodPressure = req.body.bloodPressure != undefined ? req.body.bloodPressure : report.bloodPressure;
            report.sugerLevel = req.body.sugerLevel != undefined ? req.body.sugerLevel : report.sugerLevel;
        }
        
        report.height = req.body.height != undefined ? req.body.height : report.height;
        report.weight = req.body.weight != undefined ? req.body.weight : report.weight;
        report.symptoms = req.body.symptoms != undefined ? req.body.symptoms : report.symptoms;
        
        await report.save()
        
        res.status(200).send(report);

    }catch(err){
        console.log("Error while update report : ", err.message);
        res.status(500).send({
            message : "Internal Server Error"
        })
    }
};

exports.getAllHealthTrackReportReports = async (req, res) => {

    try{

        const user = await User.findOne({userId : req.userId});


        let response;

        if(req.query.userId ){
            
            if(user.userType != constants.userType.admin && user.userId != req.query.userId){
                return res.status(403).send({
                    message : "Only admin can hit this endpont"
                })
            }

            response = await Health.find({"_id" : user.healthReports});
            
        }else{

            if(user.userType == constants.userType.admin){
                response = await Health.find();

            }else{
                response = await Health.find({"_id" : user.healthReports});
            }
        }
        res.status(201).send(response);

    }catch(err){
        console.log("Error while get all report : ", err.message);
        res.status(500).send({
            message : "Internal Server Error"
        })
    }
};

exports.getHealthTrackReportById = async (req, res) => {

    try{

        const report = await Health.findOne({_id : req.params.id});

        res.status(200).send(report);

    }catch(err){
        console.log("Error while get all report by reportId : ", err.message);
        res.status(500).send({
            message : "Internal Server Error"
        })
    }
};