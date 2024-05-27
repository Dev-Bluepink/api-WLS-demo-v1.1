"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HomeRoutes = require("./HomeRoutes");
function route(app) {
    app.use("/", HomeRoutes);
}
module.exports = route;
