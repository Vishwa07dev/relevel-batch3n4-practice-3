const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const dbConfig = require("./src/configs/db.config");
const serverConfig = require("./src/configs/server.config");
const init = require('./src/init');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));