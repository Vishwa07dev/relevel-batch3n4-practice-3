const { createRequire } = require("module");

module.exports = {
  healthRecordMiddleware: require("./healthRecord.middleware"),
  jwtMiddleware: require("./jwt.middlware"),
  userMiddleware: require("./user.middleware"),
};
