"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.environment = void 0;
const dotenv = __importStar(require("dotenv"));
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
    mysqldbName: process.env.MYSQL_DB_NAME || "test",
    mysqlUsername: process.env.MYSQL_USERNAME || "bossman",
    mysqlPassword: process.env.MYSQL_PASSWORD || "bossmanhehe",
    mysqlHost: process.env.MYSQL_HOST || "localhost:3306",
};
