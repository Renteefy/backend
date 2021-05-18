"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.assetRouter = void 0;
const express_1 = require("express");
const controller_1 = require("./controller");
const jwt_1 = __importDefault(require("../../utils/jwt"));
exports.assetRouter = express_1.Router();
// GET requests
exports.assetRouter.get("/getAllAssets", jwt_1.default.checkJWT, controller_1.getAllAssets);
exports.assetRouter.get("/getAsset/:assetID", jwt_1.default.checkJWT, controller_1.getAsset);
exports.assetRouter.get("/getSome", jwt_1.default.checkJWT, controller_1.getSome);
// POST requests
exports.assetRouter.post("/addAsset", jwt_1.default.checkJWT, controller_1.addAsset);
// PATCH requests
exports.assetRouter.patch("/updateAsset/:assetID", jwt_1.default.checkJWT, controller_1.updateAsset);
// DELETE requests
exports.assetRouter.delete("/deleteAsset/:assetID", jwt_1.default.checkJWT, controller_1.deleteAsset);
