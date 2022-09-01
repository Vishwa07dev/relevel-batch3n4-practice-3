const healthTracker=require("../models/healthTracker.models")

const healthValidation=(req,res,next)=>{
    if(!req.body.height ||req.body.height==" " )
    {
        return res.status(400).send({
            message:"Failed!!! height is not Provided"
        })
    }
    if(!req.body.weight ||req.body.weight==" " )
    {
        return res.status(400).send({
            message:"Failed!!! weight is not Provided"
        })
    }
    if(!req.body.bloodPressure ||req.body.bloodPressure==" " )
    {
        return res.status(400).send({
            message:"Failed!!! bloodPressure is not Provided"
        })
    }
    if(!req.body.sugarLevel ||req.body.sugarLevel==" " )
    {
        return res.status(400).send({
            message:"Failed!!! sugarLevel is not Provided"
        })
    }
    if(!req.body.temperature ||req.body.temperature==" " )
    {
        return res.status(400).send({
            message:"Failed!!! temperature is not Provided"
        })
    }
    if(!req.body.symptoms ||req.body.symptoms==" " )
    {
        return res.status(400).send({
            message:"Failed!!! symptoms is not Provided"
        })
    }
    next();
}

const healthvalid={
    healthValidation
}

module.exports=healthvalid