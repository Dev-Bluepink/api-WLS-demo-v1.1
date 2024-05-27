"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var UserSchema = new mongoose_1.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    status: {
        type: String,
        default: "active",
        enum: ["active", "inactive"],
    },
}, {
    timestamps: true,
});
var User = mongoose_1.default.model("User", UserSchema);
exports.default = User;
