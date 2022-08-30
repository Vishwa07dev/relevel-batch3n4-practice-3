const authController=require("../controllers/auth.controllers")

module.exports=(app)=>{
    app.post("/healthTracker/api/v1/signUp",
            authController.signUp);

    app.post("/healthTracker/api/v1/signIn",
            authController.signIn);
}