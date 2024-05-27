import * as express from "express";
const app = express();
import { route } from "./app/routes/index";
const port = process.env.PORT || 10000;
import * as db from "./app/config/db";
import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";

db.connect();
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
route(app);
app.listen(port, () =>
  console.log(`App listening at http://localhost:${port}`)
);
