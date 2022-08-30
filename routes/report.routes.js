const reportController = require('../controllers/report.controller');
const {authJwt} = require('../middlewares');
module.exports = (app)=>{
    
    app.post("/healthtack/api/v1/auth/report",[authJwt.verifyToken],reportController.createReport);

    app.put("/healthtack/api/v1/auth/report/:id",[authJwt.verifyToken],reportController.updateReport);

    app.delete("/healthtack/api/v1/auth/report/:id",[authJwt.verifyToken],reportController.deleteReport);

    

}