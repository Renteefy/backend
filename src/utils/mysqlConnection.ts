const { Sequelize, Model, DataTypes } = require("sequelize");
import { environment } from "../configs/environment";

const MYSQL_USERNAME = environment.mysqlUsername;
const MYSQL_PASSWORD = environment.mysqlPassword;
const MYSQL_HOST = environment.mysqlHost;
const MYSQL_DATABASE = environment.mysqldbName;

const sequelize = new Sequelize(`mysql://${MYSQL_USERNAME}:${MYSQL_PASSWORD}@${MYSQL_HOST}/${MYSQL_DATABASE}?charset=utf8mb4`);

export { sequelize };
