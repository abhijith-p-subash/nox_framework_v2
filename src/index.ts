import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import morgan from "morgan";
import cros from "cors";
import dotenv from "dotenv";

import routes from "./api/routes/index.js";

dotenv.config();

const PORT = process.env.PORT || 3000;
const app: Express = express();

app.use(helmet());
app.use(cros());
app.use(morgan("tiny"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.disable("x-powered-by");

app.use(routes);

app.get("/", (req: Request, res: Response) => {
  res.render("home", {
    message: "Welcome to NOX_Framework v0.1.1",
    version: process.env.VERSION,
  });
});

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
