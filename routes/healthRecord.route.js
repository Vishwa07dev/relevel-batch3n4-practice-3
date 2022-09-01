const healthRecordController = require("../controllers/healthRecord.controller");
const {authJwt, record} = require("../middlewares/index");

module.exports = (app) => {
    app.post("/health_service/api/v1/records", [authJwt.verifyToken], healthRecordController.createHealthRecord);
    app.put("/health_service/api/v1/records/:id", [authJwt.verifyToken, record.isValideOrderParamsId, authJwt.isAdminOrOwner], healthRecordController.updateHealthRecord);
    app.delete("/health_service/api/v1/records/:id", [authJwt.verifyToken, record.isValideOrderParamsId, authJwt.isAdminOrOwner], healthRecordController.deleteHealthRecord);
    app.get("/health_service/api/v1/records/:id", [authJwt.verifyToken, record.isValideOrderParamsId, authJwt.isAdminOrOwner], healthRecordController.getHealthRecordById);
    app.get("/health_service/api/v1/records", [authJwt.verifyToken], healthRecordController.getAllHealthRecord);
}