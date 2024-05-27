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
var User_1 = require("../models/User");
var hash_1 = require("../utils/hash");
var UserService = /** @class */ (function () {
    function UserService() {
    }
    UserService.prototype.addUser = function (username, email, password) {
        return __awaiter(this, void 0, void 0, function () {
            var existingUser, hashedPassword, newUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, User_1.default.findOne({
                            $or: [{ username: username }, { email: email }],
                        })];
                    case 1:
                        existingUser = _a.sent();
                        if (existingUser) {
                            throw new Error("Username hoặc email đã tồn tại");
                        }
                        hashedPassword = (0, hash_1.hashPassword)(password);
                        newUser = new User_1.default({
                            username: username,
                            email: email,
                            password: hashedPassword,
                        });
                        return [4 /*yield*/, newUser.save()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    UserService.prototype.findUserByUsername = function (username) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                //Kiểm tra xem username có hợp lệ không
                if (!username) {
                    throw new Error("Username không hợp lệ");
                }
                return [2 /*return*/, User_1.default.findOne({ username: username })];
            });
        });
    };
    UserService.prototype.findUserById = function (idUser) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!idUser) {
                    throw new Error("Id user không hợp lệ");
                }
                return [2 /*return*/, User_1.default.findById(idUser)];
            });
        });
    };
    UserService.prototype.validateUser = function (username, password) {
        return __awaiter(this, void 0, void 0, function () {
            var user, isPasswordValid;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        //Kiểm tra xem username và password có hợp lệ không
                        if (!username || !password) {
                            throw new Error("Username hoặc password không hợp lệ");
                        }
                        return [4 /*yield*/, this.findUserByUsername(username)];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            throw new Error("User không tồn tại");
                        }
                        isPasswordValid = (0, hash_1.comparePassword)(password, user.password);
                        if (!isPasswordValid) {
                            throw new Error("Password không đúng");
                        }
                        return [2 /*return*/, true];
                }
            });
        });
    };
    return UserService;
}());
exports.default = UserService;
