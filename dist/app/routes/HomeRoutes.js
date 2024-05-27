"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var router = express.Router();
var HomeController_1 = require("../controller/HomeController");
router.get("/", HomeController_1.HomeController.home);
module.exports = router;
