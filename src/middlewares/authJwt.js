const jwt = require('jsonwebtoken');
const authConfig = require('../configs/auth.config');
const User = require('../models/user.model');
const healthRecord = require('../models/healthRecord.model');
const constants = require('../utils/constants');

const verifyToken = (req, res, next) => {


    const token = req.headers[authConfig.tokenHeader];

    if(!token) {
        return res.status(403).send({
            message : "No token is provided! Access prohibited"
        })
    }

    jwt.verify(token, authConfig.secret, async (error, decoded) =>  {
        if(error) {
            return res.status(401).send({
                message : "UnAuthorized"
            });
        }

        const user = await User.findOne({ userId : decoded.id });
        req.user = user

        next();
    })

}

const isAdmin = async (req, res, next) => {
    try {

        if(req.user && req.user.userType == constants.userTypes.admin){

            next();
        } else{
            res.status(403).send({
                message : "Only ADMIN users are allowed to access this endPoint"
            })
        }
    } catch (err) {
        console.log("Error while validaing isadmin", err.message);
        return res.status(500).send({
            message: "Internal server error"
        });
    }
}


const isValidUserIdInReqParam = async (req, res, next) => {
    try {
        const user = await User.findOne({ userId: req.params.id });
        if (!user) {
            return res.status(400).send({
                message: "UserId passed doesn't exist"
            })
        }
        
        req.paramUser = user;
       
        next();
    } catch (err) { 
        console.log("Error :", err.message);
        
        return res.status(500).send({
            message: "Internal server error "
        });
    }
}

const isValidhealthRecordIdInReqParam = async (req, res, next) => {
    try {
        const health_Record = await healthRecord.findOne({ "_id": req.params.id });
        if (!health_Record) {
            return res.status(400).send({
                message: "healRecordId passed doesn't exist"
            })
          
        }
        req.paramhealthRecord = health_Record;
       
        next();
    } catch (err) { 
        console.log("Error :", err.message);
        
        return res.status(500).send({
            message: "Internal server error "
        });
    }
}

const isAdminOrOwner = async (req, res, next) => {


    try {
       
        if(req.paramUser){

            const callingUser = req.user  //req.userId was got from verifyToken middleware 
            if (callingUser.userType == constants.userTypes.admin || callingUser.userId == req.params.id) {
      
                if(callingUser.userType == constants.userTypes.admin){
                    req.isAdmin = true;
                }
                console.log("req.paus");
                next();
            } else {
                res.status(403).send({
                    message: "Only admin or the owner is allowed to make this call"
                })
            }
        } else if(req.paramhealthRecord){


            const healthRecord = req.paramhealthRecord;
            const callingUser = req.user;

            if (callingUser.userType == constants.userTypes.admin || callingUser.id == healthRecord.userId) {

                if(callingUser.userType == constants.userTypes.admin){
                    req.isAdmin = true;
                }
                
                next();
            } else {
                res.status(403).send({
                    message: "Only admin or the owner is allowed to make this call"
                })
            }
        } else {

            const callingUser = req.user;
            const healthRecord = await healthRecord.findOne({ "_id": req.params.id });
            
            if (callingUser.userType == constants.userTypes.admin || callingUser.id == healthRecord.orderedBy) {

                if(callingUser.userType == constants.userTypes.admin){
                    req.isAdmin = true;
                }
                
                next();
            } else {
                res.status(403).send({
                    message: "Only admin or the owner is allowed to make this call"
                })
            }
        }



    } catch (err) {
        console.log("Error while reading the user info", err.message);
        return res.status(500).send({
            message: "Internal server error while reading the user data"
        })
    }

}

const authJwt = {
    verifyToken : verifyToken,
    isAdmin : isAdmin,
    isValidUserIdInReqParam : isValidUserIdInReqParam,
    isValidhealthRecordIdInReqParam : isValidhealthRecordIdInReqParam,
    isAdminOrOwner : isAdminOrOwner
};

module.exports = authJwt;