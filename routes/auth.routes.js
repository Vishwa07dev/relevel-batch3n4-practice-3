const userController = require('../controllers/auth.controller');
const {authJwt, verifySignUp} = require('../middlewares');
module.exports = (app)=>{
    
    app.post("/healthtack/api/v1/auth/signup",[verifySignUp.verifySignUp], userController.signup);

    app.post("/healthtack/api/v1/auth/signin",[verifySignUp.verifySignIn],userController.signin);

}