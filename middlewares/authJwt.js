const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const serverConfig = require('../configs/serverConfig');
const constants = require('../utils/constants');
const Health = require('../models/health.model')


const verifyToken = (req, res, next) => {
    try {

        const token = req.headers["x-access-token"]

        if (!token) {

            return res.status(403).send({
                message: "Failed !! Token is not Provided !!!"
            })
        }

        jwt.verify(token, serverConfig.SECRET_KEY, (err, decoded) => {

            if (err) {
                return res.status(401).send({
                    message: "Failed !! UnAuthorized !!!"
                })
            }
            req.userId = decoded.id
            next()
        })

    } catch (err) {
        console.log("Error in token valodation : ", err.message)
        res.status(500).send("Internal server error")
    }
};

const isAdminOrOwner = async (req, res, next) => {
    try {


        if(req.params.id.length !=24){
            return res.status(400).send({
                message : "Wrong Health id given"
            })
        }

        const user = await User.findOne({ userId: req.userId });

        const report = await Health.findOne({_id : req.params.id});

        if(!report){
            return res.status(400).send({
                message : "Invalid report Id"
            })
        }

        if(user.userType != constants.userType.admin){

            if(!report.customerId.equals(user._id)){
                return res.status(403).send({
                    message : "Only admin can do this"
                })
            }
        }

        next()

    } catch (err) {
        console.log("error in validation isAdminOrOwnerOfOrder in params: ", err.message);
        res.status(500).send({
            message: "Internal Server Error"
        })
    }
}




const authRequestValidator = {
    verifyToken: verifyToken,
    isAdminOrOwner: isAdminOrOwner
}

module.exports = authRequestValidator;