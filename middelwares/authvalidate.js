const Jwt=require("jsonwebtoken");
const  secret=require("../configs/secret.config")
const User=require("../models/user.models")
const constants=require("../utils/constant")
const tokenValidated=async(req,res,next)=>{
    const token=req.headers["x-access-token"];
    if(!token)
    {
        return res.staus(400).send({
            message:"Token is not Provided"
        })
    }
    Jwt.verify(token,secret.secretKey,(err,decoded)=>{
        if(err)
        {
           return res.status(401).send({
            message:"UnAuthorised"
           })
        }
        req.userId=decoded.id;
        next();
    });
}
const isAdminorOwner=async (req,res,next)=>{
    const user=await User.findOne({userId:req.userId})
    if(user.userType==constants.userType.admin||req.params.id==user.userId)
    {
        next();
        
    }else
    {
        return res.status(403).send({
            message:"UnAuthorise User!!!Only Admin and Owner User can Access "
        })
    }
    

}
const authJwt={
    tokenValidated,
    isAdminorOwner
}

module.exports=authJwt