"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePassword = exports.hashPassword = void 0;
var bcrypt = require("bcrypt");
var hashPassword = function (password) {
    var salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
};
exports.hashPassword = hashPassword;
var comparePassword = function (password, hash) {
    return bcrypt.compareSync(password, hash);
};
exports.comparePassword = comparePassword;
