const jwt = require("jsonwebtoken");
const authConfig = require("../configs/auth.config");
const User = require('../models/user.models');
const constants = require('../utils/constants');

const verifyToken = (req, res, next) =>{
    
    const token = req.headers["x-access-token"];

    if(!token){
        return res.status(403).send({
            message : "No token provided ! Acess prohibited"
        })
    }

    jwt.verify(token, authConfig.secret, (err, decoded) =>{

        if(err){
            return res.status(401).send({
                message : "UnAuthorized !"
            });
        }
        req.userId = decoded.id;
        next();
    })

}

const isAdmin = async (req, res, next) =>{

    const user = await User.findOne({ userId : req.userId});

    if(user && user.userType == constants.userType.admin){
        next();
    }else{
        res.status(403).send({
            message : "Only ADMIN users are allowed to access this endpoint"
        })
    }
}

const isValidUserIdInReqParam = async (req, res, next) =>{
    try{
        const user = await User.findOne({ userId : req.params.id });
        if(!user){
            return res.status(400).send({
                message : "UserId passed doesn't exist"
            })
        }
        next();
    }catch(err){
        cosnole.log("Error while reading the user info ", err.message);
        return res.status(500).send({
            message : "Internal server error whiel reading the user data"
        })
    }
}




const authJwt = {
    verifyToken : verifyToken,
    isAdmin : isAdmin,
    isValidUserIdInReqParam : isValidUserIdInReqParam,
};

module.exports = authJwt;