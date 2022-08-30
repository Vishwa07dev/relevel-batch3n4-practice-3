const healthController = require('../controllers/health.controller');
const {authJwt, validateHealth} = require('../middlewares');

module.exports = (app) => {

    app.post('/healthService/api/v1/healths', [authJwt.verifyToken, validateHealth.validateHealthRequestBody], healthController.createReport);

    app.get('/healthService/api/v1/reports', [authJwt.verifyToken], healthController.getAllReports);

    app.get('/healthService/api/v1/reports/:id', [authJwt.verifyToken, authJwt.isAdminOrOwner], healthController.getReportByReportId);

    app.delete('/healthService/api/v1/reports/:id', [authJwt.verifyToken, authJwt.isAdminOrOwner], healthController.delete);

    app.put('/healthService/api/v1/reports/:id', [authJwt.verifyToken, authJwt.isAdminOrOwner], healthController.update);
};