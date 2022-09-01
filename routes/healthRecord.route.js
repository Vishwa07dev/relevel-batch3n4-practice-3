const healthRecordController = require('../controllers/healthRecord.controller');
const {verifyTokens, verifyHealthRecordReq} = require('../middlewares')

module.exports = (app)=>{
    app.post("/health/api/v1/records", [verifyTokens.userToken, verifyHealthRecordReq.validateNewRecordBody], healthRecordController.createNewRecord);
    app.put("/health/api/v1/records/:id", [verifyTokens.userToken, verifyHealthRecordReq.isValidRecordIdInReqParam, verifyHealthRecordReq.isAdminOrOwner], healthRecordController.editHealthRecord)
    app.patch("/health/api/v1/records/:id", [verifyTokens.userToken, verifyHealthRecordReq.isValidRecordIdInReqParam, verifyHealthRecordReq.isAdminOrOwner], healthRecordController.deleteHealthRecord)
    app.get("/health/api/v1/records", [verifyTokens.userToken], healthRecordController.getAllHealthRecords)
    app.get("/health/api/v1/records/:id", [verifyTokens.userToken, verifyHealthRecordReq.isValidRecordIdInReqParam, verifyHealthRecordReq.isAdminOrOwner], healthRecordController.getSingleHealthRecord)
}