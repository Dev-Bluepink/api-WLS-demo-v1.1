import * as express from "express";
import { Express } from "express";
// import * as HomeRoutes from "./HomeRoutes";
const HomeRoutes = require("./HomeRoutes");
const AuthRoutes = require("./AuthRoutes");
const UserRoutes = require("./UserRoutes");

export function route(app: Express) {
  app.use("/user", UserRoutes);
  app.use("/auth", AuthRoutes);
  app.use("/", HomeRoutes);
}
