const auth=require("../middelwares/authvalidate")
const healthvalid=require("./healthCareValidation")
module.exports={
    auth,
    healthvalid
}