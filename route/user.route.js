const {userMiddleware}=require("../middleware/index")
const userController = require("../controller/user.controller")

module.exports = (app)=>{
    app.post("healthApp/api/v1/registrations",[userMiddleware.registration],userController.registration),
    app.post("healthApp/api/v1/logins",[userMiddleware.login],userController.login)
}