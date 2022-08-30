const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const serverConfig = require("./config/server.config");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(serverConfig.db_url);
const db = mongoose.connection;
db.on("error", () => {
  console.log("Error while connecting to MongoDB");
});
db.once("open", () => {
  console.log("Connected to mongoDB");
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
