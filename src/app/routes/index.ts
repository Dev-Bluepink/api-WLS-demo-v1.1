import * as express from "express";
import { Express } from "express";
// import * as HomeRoutes from "./HomeRoutes";
const HomeRoutes = require("./HomeRoutes");
const AuthRoutes = require("./AuthRoutes");

export function route(app: Express) {
  app.use("/auth", AuthRoutes);
  app.use("/", HomeRoutes);
}
