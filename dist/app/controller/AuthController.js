"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = exports.login = void 0;
var UserService_1 = require("../service/UserService");
var userService = new UserService_1.default();
var login = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, username, password, user, _b, error_1;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.body, username = _a.username, password = _a.password;
                _c.label = 1;
            case 1:
                _c.trys.push([1, 5, , 6]);
                return [4 /*yield*/, userService.findUserByUsername(username)];
            case 2:
                user = _c.sent();
                console.log(user);
                _b = user;
                if (!_b) return [3 /*break*/, 4];
                return [4 /*yield*/, userService.validateUser(username, password)];
            case 3:
                _b = (_c.sent());
                _c.label = 4;
            case 4:
                if (_b) {
                    //   const token = tokenSign(user._id.toString());
                    res.status(200).json({ message: "Login successful", user: user });
                }
                else {
                    res.status(401).send("Invalid credentials");
                }
                return [3 /*break*/, 6];
            case 5:
                error_1 = _c.sent();
                res.status(500).send("Internal server error");
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.login = login;
var register = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, username, existingUser, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                console.log("đã tới trang đăng ký");
                if (!req.body) {
                    return [2 /*return*/, res.status(400).send("Thiếu thông tin đăng ký")];
                }
                _a = req.body, email = _a.email, password = _a.password;
                username = req.body.username;
                console.log(username, email, password);
                // Kiểm tra logic đầu vào
                if (!username || !email || !password) {
                    return [2 /*return*/, res.status(400).send("Thiếu thông tin đăng ký")];
                }
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                return [4 /*yield*/, userService.findUserByUsername(username)];
            case 2:
                existingUser = _b.sent();
                if (existingUser) {
                    return [2 /*return*/, res.status(409).send("Tên người dùng đã tồn tại")];
                }
                // Thêm người dùng mới
                return [4 /*yield*/, userService.addUser(username, email, password)];
            case 3:
                // Thêm người dùng mới
                _b.sent();
                res.status(201).send("Người dùng đã được đăng ký");
                return [3 /*break*/, 5];
            case 4:
                error_2 = _b.sent();
                res.status(500).send("Lỗi máy chủ nội bộ");
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.register = register;
