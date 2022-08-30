exports.validationOfhealthRecordBody = async(req, res, next) => {
    try {
        if (!req.body.weight) {
            return res.status(400).send({
                message: "Failed weight is not provided"
            });
        }
        if (!req.body.height) {
            return res.status(400).send({
                message: "Failed height is not provided"
            });
        }
        if (!req.body.sugerLevel) {
            return res.status(400).send({
                message: "Failed sugerLevel is not provided"
            });
        }
        if (!req.body.bloodpresure) {
            return res.status(400).send({
                message: "Failed bloodPresure is not provided"
            });
        }
        if (!req.body.temperature) {
            return res.status(400).send({
                message: "Failed temperature is not provided"
            });
        }
        if (!req.body.symptoms) {
            return res.status(400).send({
                message: "Failed symtoms is not provided"
            });
        }
        next();
    } catch (err) {
        console.log("error while updating record by body", err.message);
        return res.status(500).send({ message: "internal server error" })
    }
}