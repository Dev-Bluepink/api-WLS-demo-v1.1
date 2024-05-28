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
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenVerify = exports.tokenSign = void 0;
var jwt = __importStar(require("jsonwebtoken"));
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
