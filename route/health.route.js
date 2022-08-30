const {
  jwtMiddleware,
  healthRecordMiddleware,
} = require("../middleware/index");
const healthController = require("../controller/healthRecord.controller");

module.exports = (app) => {
  app.post(
    "/healthApp/api/v1/healthTrackrecords",
    [jwtMiddleware.verifyJWT, healthRecordMiddleware.create],
    healthController.create
  );
  app.patch(
    "/healthApp/api/v1/healthTrackrecord/:id",
    [jwtMiddleware.verifyJWT, healthRecordMiddleware.update],
    healthController.update
  );
  app.get(
    "/healthApp/api/v1/userHealthTrackRecords",
    [jwtMiddleware.verifyJWT, healthRecordMiddleware.getUsersRecord],
    healthController.getUserRecord
  );
  app.get(
    "/healthApp/api/v1/allHealthTrackRecords",
    [jwtMiddleware.verifyJWT, jwtMiddleware.isAdmin],
    healthController.allRecords
  );
  app.delete(
    "/healthApp/api/v1/uniqueHealthTrackRecord/:id",
    [jwtMiddleware.verifyJWT, healthRecordMiddleware.delete],
    healthController.deleteRecord
  );
};
