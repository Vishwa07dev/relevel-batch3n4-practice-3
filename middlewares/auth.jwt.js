const jwt = require("jsonwebtoken");
const authConfig = require("../configs/auth.config");
const constants = require("../utils/constants");
const User = require("../models/user.model");
const HealthRecord = require("../models/healthRecord.model");


const verifyToken = (req, res, next) => {
    const token = req.headers["x-access-token"];

    if(!token){
        return res.status(403).send({
            message : "Login to continue."
        });
    }
    
    jwt.verify(token, authConfig.secretKey, (err, decoded) => {
        if(err){
            return res.status(401).send({
                message : "unauthorized!"
            });
        }
        req.userId = decoded.id; // decodes the userId from the token and assigning it to the req.body for further use.
        next();
    })
}

const isAdminOrOwner = async (req, res, next) => {
    try{
        const callingUser = await User.findOne({userId : req.userId});
        const healthRecord = await HealthRecord.findOne({_id : req.params.id});

        if(callingUser.userType === constants.userTypes.admin || callingUser.userId === healthRecord.userId){
            next();
        }
        else{
            return res.status(403).send({
                message : `You are neither the admin of Health_Service_App nor the user of this record ${req.params.id}.`
            })
        }
    }
    catch(err){
        return res.status(500).send({
            message : "Internal server error. Please try again."
        })
    }
}

module.exports = {verifyToken, isAdminOrOwner};