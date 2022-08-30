const reportController = require('../controllers/report.controller');
const {verifyTokens, verifyReportReq} = require('../middlewares')

module.exports = (app)=>{
    app.post("/health/api/v1/reports/", [verifyTokens.userToken, verifyReportReq.validateNewReportBody], reportController.createReport);
    app.put("/health/api/v1/reports/:id", [verifyTokens.userToken, verifyReportReq.isValidReportIdInReqParam, verifyReportReq.validateReportUpdateBody], reportController.editReport)
    app.delete("/health/api/v1/reports/:id", [verifyTokens.userToken, verifyReportReq.isValidReportIdInReqParam], reportController.deleteReport)
    app.get("/health/api/v1/reports/", [verifyTokens.userToken], reportController.getAllReports)
    app.get("/health/api/v1/reports/:id", [verifyTokens.userToken, verifyReportReq.isValidReportIdInReqParam, verifyReportReq.validateReportUpdateBody], reportController.getSingleReport)
}