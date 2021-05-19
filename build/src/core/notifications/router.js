"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.notificationRouter = void 0;
const express_1 = require("express");
const controller_1 = require("./controller");
const jwt_1 = __importDefault(require("../../utils/jwt"));
exports.notificationRouter = express_1.Router();
// POST requests
exports.notificationRouter.post("/createNotification", jwt_1.default.checkJWT, controller_1.createNotification);
exports.notificationRouter.post("/checkNotification", jwt_1.default.checkJWT, controller_1.checkNotification);
// PATCH requests
exports.notificationRouter.patch("/updateNotification/:notificationID", jwt_1.default.checkJWT, controller_1.updateNotification);
