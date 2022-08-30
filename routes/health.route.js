const healthTrackController = require('../controllers/healthRecord.controller');
const { authJwt, healthTrack } = require('../middlewares');


module.exports = (app) => {

    app.post("/healthTracker/api/v1/healthRecords", [authJwt.verifyToken, healthRecordValidator.vadlidationOfOrderBody], healthRecordController.createHealthrecord);

    app.get("/healthTracker/api/v1/healthRecords", [authJwt.verifyToken, authJwt.isAdminOrOwner], healthRecordController.getAllhealthRecords);

    app.get("/healthTracker/api/v1/healthRecord/:id", [authJwt.verifyToken, authJwt.isValidhealthRecordIdInReqParam, authJwt.isAdminOrOwner], healthRecordController.findByHealthRecordId);

    app.put("/healthTracker/api/v1/healthRecords/:id", [authJwt.verifyToken, authJwt.isValidhealthRecordIdInReqParam, authJwt.isAdminOrOwner], healthRecordControllerupdate.healthRecord);

}