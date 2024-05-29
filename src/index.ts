import express from "express";
import session from "express-session";
import passport from "./app/config/configPassport";
import { route } from "./app/routes/index";
import * as db from "./app/config/db";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import swaggerSpec from "./app/config/swagger";
import swaggerUi from "swagger-ui-express";

const app = express();
const port = process.env.PORT || 10000;

db.connect();
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set("views", __dirname + "/../views");
app.set("view engine", "ejs");

app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use((req, res, next) => {
  if (!req.session) {
    return next(new Error("Session not initialized")); // handle error
  }
  next(); // otherwise continue
});

route(app);

app.listen(port, () =>
  console.log(`App listening at http://localhost:${port}`)
);
