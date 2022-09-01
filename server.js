const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const dbConfig = require("./configs/db.config");
const serverConfig = require("./configs/server.config");
const User = require("./models/user.model");
const HealthRecord = require("./models/healthRecord.model");
const constants = require("./utils/constants");
const { init } = require("./models/user.model");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

mongoose.connect(dbConfig.DB_URI);
const db = mongoose.connection;

db.on("error", () => {
  console.log("Error while connecting to MongoDB");
});
db.once("open", () => {
  console.log("Connected to mongoDB.");
  initAdmin();
});

async function initAdmin (){
  await User.collection.drop();
  await HealthRecord.collection.drop();
  require("./utils/initialDummyData")(User, HealthRecord, bcrypt);

  const admin = await User.create({
    name : "admin",
    userId : "admin",
    email : "admin@gmail.com",
    password : bcrypt.hashSync("welcome", 8),
    userType : constants.userTypes.admin
  });
}

require("./routes/auth.route")(app);
require("./routes/healthRecord.route")(app);


module.exports = app.listen(serverConfig.PORT, () => {
    console.log(`Server is up on the port : ${serverConfig.PORT}`);
})