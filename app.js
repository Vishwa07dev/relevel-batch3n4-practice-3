const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const dbConfig = require("./configs/db.config");
const serverConfig = require("./configs/server.config");
const User = require("./models/user.model");
const Order = require("./models/order.model");


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(dbConfig.DB_URI);
const db = mongoose.connection;
db.on("error", () => {
    console.log("Error while connecting to MongoDB");
});
db.once("open", () => {
    console.log("Connected to mongoDB");
    require("./utils/initialData")(User, Healthcare, bcrypt);
});
require("./routes/auth.route")(app);
require("./routes/HealthTrack.route")(app);


module.exports = app.listen(serverConfig.PORT, () => {
    console.log(`Server is up on the port : ${serverConfig.PORT}`);
})
