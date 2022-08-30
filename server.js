const express = require('express');
const app = express();
const serverConfig = require('./configs/server.config')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dbConfig = require('./configs/db.config');
const bcrypt = require('bcryptjs');
const User = require('./models/user.model');
const constants = require('./utils/constants');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));


mongoose.connect(dbConfig.DB_URL);
const db = mongoose.connection;
db.on("error", ()=>{
    console.log("#### Error while connecting to mongoDB ####");
});
db.once("open", async()=>{
    await User.create(admin);
    console.log("#### Connected to mongoDB ####");
});

const admin = {
    name : "Admin",
    username : "admin",
    email : "admin@app.com",
    password : bcrypt.hashSync("AdminOfApp#1", 10),
    userType : constants.userTypes.admin
}


require('./routes/auth.route')(app);
require('./routes/report.route')(app);

app.listen(serverConfig.PORT,()=>{
    console.log(`#### connected to server at port no.: ${serverConfig.PORT} ####`);
})