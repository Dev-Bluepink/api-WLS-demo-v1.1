import * as express from "express";
import { Express } from "express";
// import * as HomeRoutes from "./HomeRoutes";
const HomeRoutes = require("./HomeRoutes");

export function route(app: Express) {
  app.use("/", HomeRoutes);
}
