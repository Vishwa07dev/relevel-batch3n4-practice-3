const User=require("../models/user.models")
const mongoose=require("mongoose");
const bcrypt=require("bcryptjs");
const Jwt=require("jsonwebtoken")
const secret=require("../configs/secret.config");
const constant = require("../utils/constant");
exports.signUp=async (req,res)=>{
    const userObj={
        name:req.body.name,
        userId:req.body.userId,
        address:req.body.address,
        email:req.body.email,
        password:bcrypt.hashSync(req.body.password,8),
        userType:req.body.userType,
        userStatus:req.body.userStatus
    }
    try
    {
        const newUser=await User.create(userObj);
        const response={
            name:newUser.name,
            userId:newUser.userId,
            address:newUser.address,
            email:newUser.email,
            password:newUser.password,
            userType:newUser.userType,
            userStatus:newUser.userStatus
        }
        res.status(201).send(response);
    }catch(err){
        console.log("error while creating user",err.message);
        res.status(500).send({
            message:"Internal Server Error"
        })
    }
};

exports.signIn=async(req,res)=>{
    try{
        const user=await User.findOne({userId:req.body.userId});

    if(user==null)
    {
        res.status(500).send({
            message:"User Doesn't Exist"
        })
    }
    
    if(user.userStatus==constant.userStatus.pending)
    {
        res.status(500).send({
            message:"Failed!!! userStatus is not Approved"
        })
    }
    const isValid=bcrypt.compareSync(req.body.password,user.password)
    if(!isValid)
    {
        res.status(500).send({
            message:"Internal Server Error"
        })
    }

    const token=Jwt.sign({id:user.userId},secret.secretKey,{
        expiresIn:600
    });

    res.status(200).send({
        name:user.name,
        userId:user.userId,
        address:user.address,
        email:user.email,
        userType:user.userType,
        userStatus:user.userStatus,
        accessToken:token

    })

    }
    catch(err)
    {
        console.log("error while signin",err.message)
        res.status(500).send({
            message:"Internal Server Error"
        })
    }    
}