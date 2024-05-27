"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var app = express();
var route = require("./app/routes/index");
var port = process.env.PORT || 10000;
route(app);
app.listen(port, function () {
    return console.log("App listening at http://localhost:".concat(port));
});
