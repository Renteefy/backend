"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const environment = {
    PORT: Number(process.env.PORT) || 3000,
    MONGODB_URL: process.env.MONGODB_URL || "mongodb://localhost:27017",
    MONGODB_DATABASE_NAME: process.env.MONGODB_DATABASE_NAME || "renteefy_dev",
    JWT_SECRET: process.env.JWT_SECRET || "hehehehehehemainahibataunga",
    JWT_EXPIRY: process.env.JWT_EXPIRY || "24d",
    WALLET_LIMIT: Number(process.env.WALLET_LIMIT) || 0,
};
exports.default = environment;
