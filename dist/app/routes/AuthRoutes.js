"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = __importStar(require("express"));
var router = express.Router();
var configPassport_1 = __importDefault(require("../config/configPassport"));
var AuthController_1 = require("../controller/AuthController");
router.post("/register", AuthController_1.register);
router.post("/login", AuthController_1.login);
router.get("/google", configPassport_1.default.authenticate("google", {
    scope: ["profile", "email"],
}));
router.get("/google/callback", configPassport_1.default.authenticate("google", { failureRedirect: "/login" }), AuthController_1.loginFB);
router.get("/logout", function (req, res, next) {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect("/"); // Chuyển hướng đến trang đăng nhập sau khi đăng xuất
    });
});
// Route để bắt đầu xác thực với Facebook
router.get("/facebook", configPassport_1.default.authenticate("facebook", { scope: ["email"] }));
// Route để xử lý callback từ Facebook
router.get("/facebook/callback", configPassport_1.default.authenticate("facebook", { failureRedirect: "/login" }), function (req, res) {
    res.redirect("/");
});
module.exports = router;
