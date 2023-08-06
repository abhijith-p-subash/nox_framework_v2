import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";

dotenv.config();

const sequlizeConnection = new Sequelize({
  dialect: "mysql",
  host: process.env.MYSQL_HOST,
  username: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  logging: false,
});

export default sequlizeConnection;
