const {
  jwtMiddleware,
  healthRecordMiddleware,
} = require("../middleware/index");
const healthController = require("../controller/healthRecord.controller");

module.exports = (app) => {
  app.post(
    "healthApp/api/v1/records",
    [jwtMiddleware.verifyJWT, healthRecordMiddleware.create],
    healthController.create
  );
  app.patch(
    "healthApp/api/v1/record/:id",
    [jwtMiddleware.verifyJWT, healthRecordMiddleware.update],
    healthController.update
  );
  app.get(
    "healthApp/api/v1/userRecords",
    [jwtMiddleware.verifyJWT, healthRecordMiddleware.getUsersRecord],
    healthController.getUserRecord
  );
  app.get(
    "healthApp/api/v1/allRecords",
    [jwtMiddleware.verifyJWT, jwtMiddleware.isAdmin],
    healthController.allRecords
  );
  app.delete(
    "healthApp/api/v1/uniqueRecord/:id",
    [jwtMiddleware.verifyJWT, healthRecordMiddleware.delete],
    healthController.deleteRecord
  );
};
