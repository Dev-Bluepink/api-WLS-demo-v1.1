"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenVerify = exports.tokenSign = void 0;
var jwt = require("jsonwebtoken");
var tokenSign = function (idUser) {
    if (!idUser) {
        throw new Error("idUser không hợp lệ");
    }
    return jwt.sign({ _id: idUser }, "PW");
};
exports.tokenSign = tokenSign;
var tokenVerify = function (token) {
    if (!token) {
        throw new Error("Token không hợp lệ");
    }
    try {
        return jwt.verify(token, "PW");
    }
    catch (err) {
        throw new Error("Token không hợp lệ hoặc đã hết hạn");
    }
};
exports.tokenVerify = tokenVerify;
