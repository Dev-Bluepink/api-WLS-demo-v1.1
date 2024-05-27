"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.route = void 0;
// import * as HomeRoutes from "./HomeRoutes";
var HomeRoutes = require("./HomeRoutes");
var AuthRoutes = require("./AuthRoutes");
function route(app) {
    app.use("/auth", AuthRoutes);
    app.use("/", HomeRoutes);
}
exports.route = route;
