const healthController = require('../controllers/health.controller');
const {authJwt, validateHealth} = require('../middlewares');

module.exports = (app) => {

    app.post('/healthService/api/v1/healthReports', [authJwt.verifyToken, validateHealth.validateHealthRequestBody], healthController.createHealthTrackReport);

    app.get('/healthService/api/v1/healthReports', [authJwt.verifyToken], healthController.getAllHealthTrackReportReports);

    app.get('/healthService/api/v1/healthReports/:id', [authJwt.verifyToken, authJwt.isAdminOrOwner], healthController.getHealthTrackReportById);

    app.delete('/healthService/api/v1/healthReports/:id', [authJwt.verifyToken, authJwt.isAdminOrOwner], healthController.deleteHealthTrackReport);

    app.put('/healthService/api/v1/healthReports/:id', [authJwt.verifyToken, authJwt.isAdminOrOwner], healthController.updateHealthTrackReport);
};