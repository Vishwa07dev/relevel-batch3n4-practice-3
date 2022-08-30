const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/user.models');
const Report = require('./models/report.models');
const serverConfig = require("./configs/server.config");
const dbConfig = require("./configs/db.config");


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));


mongoose.connect(dbConfig.DB_URL);
const db = mongoose.connection;
db.on("error",()=>{
    console.log("Error while connecting to MongoDB");
});
db.once("open", ()=>{
    console.log("Connected to mongoDB");
    init();
});

async function init(){
    try{
        await User.collection.drop();
        await Report.collection.drop();
    }catch(err){
        console.log('init', err.message);
    }
}

require('./routes/auth.routes')(app);
require('./routes/report.routes')(app);
app.listen(serverConfig.PORT, ()=>{
    console.log("Server is Running on PORT", serverConfig.PORT);
})