const orderController = require('../controllers/healthRecord.controller');
const { authJwt, healthRecordValidator } = require('../middlewares');


module.exports = (app) => {

    app.post("/healthTracker/api/v1/healthRecords", [authJwt.verifyToken, ordervalidator.vadlidationOfOrderBody], orderController.createHealthrecord);

    app.get("/healthTracker/api/v1/healthRecords", [authJwt.verifyToken, authJwt.isAdminOrOwner], orderController.getAllhealthRecords);

    app.get("/healthTracker/api/v1/healthRecord/:id", [authJwt.verifyToken, authJwt.isValidhealthRecordIdInReqParam, authJwt.isAdminOrOwner], orderController.findByHealthRecordId);

    app.put("/healthTracker/api/v1/healthRecords/:id", [authJwt.verifyToken, authJwt.isValidhealthRecordIdInReqParam, authJwt.isAdminOrOwner], orderController.updatehealthRecord);
 
}