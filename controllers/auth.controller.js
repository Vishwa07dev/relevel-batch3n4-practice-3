require('dotenv').config();
const bcrypt = require('bcryptjs');
const User = require('../models/user.model')
const jwt = require('jsonwebtoken');
const authConfig = require('../configs/auth.config');


exports.signup = async (req,res)=>{

    const userObj = {
        name : req.body.name,
        username : req.body.username,
        email : req.body.email,
        password : bcrypt.hashSync(req.body.password, 10),
    };

    try{
        const userCreated = await User.create(userObj);
        
        const response = {
            id : userCreated._id,
            name : userCreated.name,
            username : userCreated.username,
            email : userCreated.email,
        }


        console.log(`#### User ${response.name} created ####`);
        res.status(201).send(response);
    }catch(err){
        console.log("#### error while user sign up #### ", err.message);
        res.status(500).send({
            message : "Internal server error while creating user"
        });
    }
}

exports.signin = async (req,res)=>{
    try{
        const user = await User.findOne({username : req.body.username})
        if(!user){
            return res.status(400).send({
                message : "Failed! username provided dosen't exist"
            });
        }
        
        const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if(!passwordIsValid){
            return res.status(401).send({
                message : "Wrong password"
            });
        }

        const token = jwt.sign({id: user._id,}, authConfig.secret, {expiresIn : process.env.JWT_TIME});
        console.log(`#### ${user.userType} ${user.name} logged in ####`);

        res.status(200).send({
            name : user.name,
            username : user.username,
            email : user.email,
            userType : user.userType,
            accesToken : token
        });
    }catch(err){
        console.log("#### Error while user sign in ##### ", err.message);
        res.status(500).send({
            message : "Internal server error while user signin"
        });
    }
}