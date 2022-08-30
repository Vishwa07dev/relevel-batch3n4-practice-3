const bcrypt = require('bcrypt');
const User = require('../models/user.models');
const jwt = require('jsonwebtoken');
const authConfig = require('../configs/auth.config');
const constants = require('../utils/constants');

//SignUp and Register
exports.signup = async (req, res) =>{
 

    const userObj = {
        name : req.body.name,
        userId : req.body.userId,
        email : req.body.email,
        userType : req.body.userType,
        password : bcrypt.hashSync(req.body.password,8),
    };

    try{
        const userCreated = await User.create(userObj);

        const response = {
            name : userCreated.name,
            userid : userCreated.userId,
            email : userCreated.email,
            userType : userCreated.userType,
            createdAt : userCreated.createdAt,
            updatedAt : userCreated.updatedAt
        }
        res.status(201).send(response);
    }catch(err){
        console.log("Some error happened ", err.message);
        res.status(500).send({
            message : "Some internal server error"
        });
    }
}

exports.signin = async (req, res) =>{

    try{
        const user = await User.findOne({userId : req.body.userId});
        if(user == null){
            return res.status(400).send({
                message : "Failed ! UserId passed doesn't exist"
            });
        }

        const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        
        if(!passwordIsValid){
            return res.status(401).send({
                message : "Wrong Password"
            });
        }


        const token = jwt.sign({
            id : user.userId
        }, authConfig.secret,{
            expiresIn : 600
        });

        res.status(200).send({
            name : user.name,
            userId : user.userId,
            email : user.email,
            userType : user.userType,
            accessToken : token
        });

    }catch(err){
        console.log("Internal Error , ", err.message);
        res.status(500).send({
            message : "Some internal error while signin"
        })
    }

}