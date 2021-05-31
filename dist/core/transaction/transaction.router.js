"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jwt_1 = require("../../config/jwt");
const transaction_controller_1 = require("./transaction.controller");
const Router = express_1.default.Router();
Router.post("/getTransaction", jwt_1.checkAuth, transaction_controller_1.getTransaction);
Router.get("/getAllTransaction", jwt_1.checkAuth, transaction_controller_1.getAllTransaction);
exports.default = Router;
