"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var app = express();
var index_1 = require("./app/routes/index");
var port = process.env.PORT || 10000;
var db = require("./app/config/db");
var bodyParser = require("body-parser");
db.connect();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
(0, index_1.route)(app);
app.listen(port, function () {
    return console.log("App listening at http://localhost:".concat(port));
});
