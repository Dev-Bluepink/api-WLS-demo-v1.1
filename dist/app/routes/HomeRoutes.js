"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var router = express.Router();
// import { HomeController } from "../controller/HomeController";
var HomeController = require("../controller/HomeController");
router.get("/", HomeController.home);
module.exports = router;