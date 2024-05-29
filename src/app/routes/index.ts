import * as express from "express";
import { Express } from "express";
const HomeRoutes = require("./HomeRoutes");
const AuthRoutes = require("./AuthRoutes");
const UserRoutes = require("./UserRoutes");
const SchoolRoutes = require("./SchoolRoutes");

export function route(app: Express) {
  app.use("/school", SchoolRoutes);
  app.use("/user", UserRoutes);
  app.use("/auth", AuthRoutes);
  app.use("/", HomeRoutes);
}
