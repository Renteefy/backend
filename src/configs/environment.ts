import * as dotenv from "dotenv";
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
export const environment = {
  nodeEnv: process.env.ENV || process.env.NODE_ENV,
  logDir: process.env.LOG_DIR || "logs",
  logLevel: process.env.LOG_LEVEL || "info",
  logFile: process.env.LOG_FILE || "server.log",
  port: process.env.PORT || 5000,
  mongodbName: process.env.MONGO_DATABASE_NAME || "test",
  mongoUsername: process.env.MONGO_USERNAME || "bossman",
  mongoPassword: process.env.MONGO_PASSWORD || "bossmanhehe",
  mongoHost: process.env.MONGO_HOST || "localhost:27017", // careful with the trailling slashes. Add them in the connection file
  jwtSecret: process.env.JWT_SECRET || "verysecret",
  jwtExpiry: process.env.JWT_EXPIRY || "24d",
};
