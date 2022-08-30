const Health = require('../models/health.model');

const validateHealthRequestBody = (req, res, next) => {
    try{
        if(!req.body.height || !req.body.weight || !req.body.bloodPressure || !req.body.temparature 
            || !req.body.sugerLevel || !req.body.symptoms){
            return res.status(400).send({
                message : "Required Field missed must provide [deliveryDate, items, totalCost, address]"
            })
        }

        next()

    }catch(err){
        console.log("error in validate order body");
        res.status(500).send({
            message : "Internal Server Error"
        })
    }
}

module.exports = {
    validateHealthRequestBody : validateHealthRequestBody
}