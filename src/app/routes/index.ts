import { Express } from "express";
const HomeRoutes = require("./HomeRoutes");
const AuthRoutes = require("./AuthRoutes");
const UserRoutes = require("./UserRoutes");
const SchoolRoutes = require("./SchoolRoutes");
const CriteriaRoutes = require("./CriteriaRoutes");
const VoteRoutes = require("./VoteRoutes");

export function route(app: Express) {
  app.use("/criteria", CriteriaRoutes);
  app.use("/school", SchoolRoutes);
  app.use("/user", UserRoutes);
  app.use("/auth", AuthRoutes);
  app.use("/vote", VoteRoutes);
  app.use("/", HomeRoutes);
}
