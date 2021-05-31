"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//import { rentAsset_validator } from "../../config/validator";
const jwt_1 = require("../../config/jwt");
const router = express_1.default.Router();
const asset_controller_1 = require("./asset.controller");
router.get("/healthcheck", asset_controller_1.assetHealthcheck);
router.get("/getAllAssets", jwt_1.checkAuth, asset_controller_1.getAllAssets);
router.post("/addAsset", jwt_1.checkAuth, asset_controller_1.addAsset);
router.post("/rent", jwt_1.checkAuth, asset_controller_1.rentAsset);
// router.get("/getSome", checkAuth, getSome);
// router.post("/addAsset", checkAuth, addAsset);
// router.patch("/updateAsset/:assetID", checkAuth, updateAsset);
// router.delete("/deleteAsset/:assetID", checkAuth, deleteAsset);
exports.default = router;
