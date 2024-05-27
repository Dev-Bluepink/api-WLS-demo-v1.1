"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var router = express.Router();
var AuthController_1 = require("../controller/AuthController");
router.post("/register", AuthController_1.register);
router.post("/login", AuthController_1.login);
module.exports = router;
