import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import morgan from "morgan";
import cros from "cors";
import dotenv from "dotenv";
import hpp from "hpp";
import { createServer } from "http";

import routes from "./api/routes/index.routes";
import sequlizeConnection from "./config/database";
import mongoConnection from "./config/mongo";
import redisClient from "./config/redis";

import passport from "passport";
import { jwtAuth } from "./api/modules/auth/jwt/jwt.strategy";
import { localAuth } from "./api/modules/auth/local/local.strategy";
//import { SocketService } from "./core/modules/socket/socket.service";

dotenv.config();

const PORT = process.env.PORT || 3000;
const app: Express = express();
const server = createServer(app);
// const socketService = new SocketService(server);

app.use(helmet());
app.use(cros());
app.use(morgan("tiny"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(hpp());
app.set("view engine", "ejs");
app.use(express.static("public"));
passport.use(jwtAuth);
passport.use(localAuth);
app.use(passport.initialize());

// socketService.init();

app.disable("x-powered-by");

app.use(routes);

app.get("/", (req: Request, res: Response) => {
  res.render("home", {
    message: "Welcome to NOX_Framework v0.1.1",
    version: process.env.VERSION,
  });
});

const start = async (): Promise<void> => {
  try {
    await sequlizeConnection
      .sync()
      .then(() => console.log("\x1b[32m", "mySql Connected"));
    await mongoConnection().then(() => {
      console.log("\x1b[32m", "MogoDB Connected");
    });
    await redisClient.connect().then(() => {
      console.log("\x1b[32m", "Redis Client Connected");
    });
    app.listen(PORT, () => {
      console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

void start();
