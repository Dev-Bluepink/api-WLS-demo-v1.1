import * as express from "express";
const app = express();
import { route } from "./app/routes/index";
const port = process.env.PORT || 10000;
import * as db from "./app/config/db";

db.connect();
route(app);
app.listen(port, () =>
  console.log(`App listening at http://localhost:${port}`)
);
