const mongoose=require("mongoose")
const healthTracker=require("../models/healthTracker.models");
const User=require("../models/user.models")
const objectConverter=require("../utils/objectConverter")
exports.healthRecord=async (req,res)=>{
    try
    {
    const healthObj={
        height:req.body.height,
        weight:req.body.weight,
        bloodPressure:req.body.bloodPressure,
        sugarLevel:req.body.sugarLevel,
        temperature:req.body.temperature,
        symptoms:req.body.symptoms,
        userId:req.userId
    }
  
   
        const health=await healthTracker.create(healthObj)
        if(health)
        {
            const user=await User.findOne({userId:req.userId});
            user.healthReport.push(health._id);
            await user.save();
        }
        res.status(201).send(health)
    }catch(err)
    {
        console.log("Error while creating healthTracker",err.message)
        res.status(500).send({
            message:"Internal Server Error"
        })
    }
}

exports.recordUpdate=async (req,res)=>{
    try{
        const health=await healthTracker.findOne({userId:req.params.id})
       
        health.height=req.body.height!=undefined?req.body.height:health.height;
        health.weight=req.body.weight!=undefined?req.body.weight:health.weight;
        health.bloodPressure=req.body.bloodPressure!=undefined?req.body.bloodPressure:health.bloodPressure;
        health.sugarLevel=req.body.sugarLevel!=undefined?req.body.sugarLevel:health.sugarLevel;
        health.temperature=req.body.temperature!=undefined?req.body.temperature:health.temperature;
        health.symptoms=req.body.symptoms!=undefined?req.body.symptoms:health.symptoms;
       
        const updateHealth=await health.save();
       
       
        res.status(200).send({
            height:updateHealth.height,
            weight:updateHealth.weight,
            bloodPressure:updateHealth.bloodPressure,
            sugarLevel:updateHealth.sugarLevel,
            temperature:updateHealth.temperature,
            symptoms:updateHealth.symptoms
        })
    }catch(err)
    {
        console.log("Error",err.message)
        res.status(500).send({
            message:"Internal Server Error"
        })
    }
}


exports.deleteRecord=async (req,res)=>{
    try
    {
        await healthTracker.deleteOne({userId:req.userId});
        res.status(200).send({
            message:"Successfully Deleted.."
        })
    }catch(err)
    {
        console.log(err.message);
        res.status(500).send({
            message:"Internal Server Error"
        })
    }
    


}


exports.findById=async (req,res)=>{
    try
    {
        const healthTrac=await healthTracker.find({userId:req.params.id});
        res.status(200).send(objectConverter.reportResponse(healthTrac))
    }catch(err)
    {
        console.log("error",err.message)
        res.status(500).send({
            message:"Internal Server Error"
        })
    }
}