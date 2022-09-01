const verifyAuth = require("./verifyAuth");
const authJwt = require("./auth.jwt");
const record = require("./healthRecord.Middleware")

module.exports = {
    verifyAuth,
    authJwt,
    record
}