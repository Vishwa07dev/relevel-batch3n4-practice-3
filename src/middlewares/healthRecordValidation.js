const vadlidationOfhealthRecordBody = async (req, res, next) => {

    try{

        if (!req.body.weight) {
            return res.status(400).send({
                message: "Failed ! weight is not provided"
            });
        }
        if (!req.body.height) {
            return res.status(400).send({
                message: "Failed ! height is not provided"
            });
        }

        if(req.body.sugerLevel) {
            return res.status(400).send({
                message : "Failed ! sugerLevel is not provided"
            })
        }

        if(req.body.bloodPressure) {
            return res.status(400).send({
                message : "Failed ! bloodPressure is not provided"
            })
        }

        if(req.body.temperature) {
            return res.status(400).send({
                message : "Failed ! temperature is not provided"
            })
        }

        if(req.body.symptoms) {
            return res.status(400).send({
                message : "Failed ! symptoms is not provided"
            })
        }

        next();
    } catch (err) {
        console.log("error while validating heal record body ", err.message);
        res.status(500).send({
            message : "Internal server error"
        });
    }
}

module.exports = {
    vadlidationOfhealthRecordBody : vadlidationOfhealthRecordBody
}