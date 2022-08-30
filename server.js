const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const uuid = require("uuid");
const bcrypt = require("bcrypt");
const serverConfig = require("./config/server.config");
const User = require("./model/user.model");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(serverConfig.db_url);
const db = mongoose.connection;
db.on("error", () => {
  console.log("Error while connecting to MongoDB");
});
db.once("open", async () => {
  console.log("Connected to mongoDB");
  await User.create({
    name: "Vinish",
    age: 29,
    height: "170",
    weight: "60",
    email: "vinish@email.com",
    password: bcrypt.hashSync("Vinish@1", 10),
    userId: uuid.v4(),
    userType: "ADMIN",
    userStatus: "APPROVED",
  });
});
app.get("/", (req, res) => {
  res.status(200).send("seuccess");
});

require("./route/user.route")(app);
require("./route/health.route")(app);

app.listen(serverConfig.PORT, () => {
  console.log("app is listening at port:", serverConfig.PORT);
});

// app.listen(serverConfig.port, () => {
// console.log("REached");
// });
//
