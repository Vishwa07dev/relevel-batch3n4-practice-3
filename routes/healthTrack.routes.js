const healthController=require("../controllers/healthcare.controllers");
const {auth,healthvalid}=require("../middelwares/index")
module.exports=(app)=>{
    app.post("/healthTracker/api/v1/health",
            [auth.tokenValidated,healthvalid.healthValidation],
            healthController.healthRecord)

    app.put("/healthTracker/api/v1/health/:id",
            [auth.tokenValidated,auth.isAdminorOwner],
            healthController.recordUpdate);
    
    app.delete("/healthTracker/api/v1/health/:id",
                [auth.tokenValidated,auth.isAdminorOwner],
                healthController.deleteRecord);

    app.get("/healthTracker/api/v1/health/:id",
            [auth.tokenValidated,auth.isAdminorOwner],
            healthController.findById)
}