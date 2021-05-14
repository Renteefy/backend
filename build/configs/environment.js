"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.environment = void 0;
const dotenv = require("dotenv");
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
exports.environment = {
    nodeEnv: process.env.ENV || process.env.NODE_ENV,
    logDir: process.env.LOG_DIR || "logs",
    logLevel: process.env.LOG_LEVEL || "info",
    logFile: process.env.LOG_FILE || "server.log",
    port: process.env.PORT || 5000,
    mongodbName: process.env.MONGO_DATABASE_NAME || "test",
    mongoUsername: process.env.MONGO_USERNAME || "bossman",
    mongoPassword: process.env.MONGO_PASSWORD || "bossmanhehe",
    mongoHost: process.env.MONGO_HOST || "localhost:27017",
    jwtSecret: process.env.JWT_SECRET || "verysecret",
    jwtExpiry: process.env.JWT_EXPIRY || "24d",
};
