"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const controller_1 = require("./controller");
const jwt_1 = __importDefault(require("../../utils/jwt"));
exports.userRouter = express_1.Router();
exports.userRouter.get("/getAll", controller_1.getAllUsers);
exports.userRouter.post("/checkUser", controller_1.checkUser);
exports.userRouter.post("/storeLoginDetails", controller_1.storeLoginDetails);
exports.userRouter.post("/userLogin", controller_1.userLogin);
exports.userRouter.get("/getUserInfo", jwt_1.default.checkJWT, controller_1.getUserInfo);
exports.userRouter.get("/getDashboardInfo", jwt_1.default.checkJWT, controller_1.getDashboardInfo);
exports.userRouter.patch("/patchUserInfo", jwt_1.default.checkJWT, controller_1.patchUserInfo);
