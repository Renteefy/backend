"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAsset = exports.updateAsset = exports.getSome = exports.getAsset = exports.addAsset = exports.getAllAssets = void 0;
const model_1 = __importDefault(require("./model"));
const model_2 = __importDefault(require("../users/model"));
const service_1 = require("./service");
const default_logger_1 = require("../../utils/default.logger");
const nanoid_1 = require("nanoid");
const mysqlConnection_1 = require("../../utils/mysqlConnection");
const { Sequelize } = require("sequelize");
const Op = Sequelize.Op;
const getAllAssets = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const assets = yield service_1.listAssets_service({ Asset: model_1.default });
    res.status(200).json(assets);
});
exports.getAllAssets = getAllAssets;
const addAsset = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const assetID = "assetID-" + nanoid_1.nanoid();
        const userID = res.locals.jwtPayload["userID"];
        req.body.assetID = assetID;
        req.body.userID = userID;
        yield mysqlConnection_1.sequelize.sync();
        const new_asset = yield service_1.addAsset_service({ Asset: model_1.default, reqBody: req.body });
        if (new_asset) {
            return res.status(200).json({ message: "Asset added successfully", assetID: assetID });
        }
        else {
            return res.status(400).json({ message: "Error in inserting new record" });
        }
    }
    catch (err) {
        default_logger_1.logger.error(err);
        return res.status(500).json({ message: "Something went wrong 😕", error: err });
    }
});
exports.addAsset = addAsset;
const getAsset = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const assetID = req.params.assetID;
        const { asset, user } = yield service_1.getAsset_service({ Asset: model_1.default, assetID: assetID, User: model_2.default });
        if (asset) {
            return res.status(200).json({ message: "This is the asset and the owner", asset: asset, owner: user });
        }
        else {
            return res.status(400).json({ message: "Unable to find asset" });
        }
    }
    catch (err) {
        default_logger_1.logger.error(err);
        return res.status(500).json({ message: "Something went wrong 😕", error: err });
    }
});
exports.getAsset = getAsset;
const getSome = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const arr = req.body.arr;
        const assets = yield service_1.getSome_service({ Asset: model_1.default, arr: arr, Op: Op });
        if (assets) {
            return res.status(200).json({ message: "These are the asset", asset: assets });
        }
        else {
            return res.status(400).json({ message: "Unable to find assets" });
        }
    }
    catch (err) {
        default_logger_1.logger.error(err);
        return res.status(500).json({ message: "Something went wrong 😕", error: err });
    }
});
exports.getSome = getSome;
const updateAsset = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const changes = req.body.changes;
        const assetID = req.params.assetID;
        const isUpdated = yield service_1.updateAsset_service({ Asset: model_1.default, changes: changes, assetID: assetID });
        if (isUpdated) {
            return res.status(200).json({ message: "Asset updated successfully" });
        }
        else {
            return res.status(400).json({ message: "Something went wrong while updating the asset" });
        }
    }
    catch (err) {
        default_logger_1.logger.error(err);
        return res.status(500).json({ message: "Something went wrong 😕", error: err });
    }
});
exports.updateAsset = updateAsset;
const deleteAsset = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const assetID = req.params.assetID;
        const isDeleted = yield service_1.deleteAsset_service({ Asset: model_1.default, assetID: assetID });
        if (isDeleted) {
            return res.status(200).json({ message: "Asset deleted successfully" });
        }
        else {
            return res.status(200).json({ message: "Something went wrong while deleting the asset" });
        }
    }
    catch (err) {
        default_logger_1.logger.error(err);
        return res.status(500).json({ message: "Something went wrong 😕", error: err });
    }
});
exports.deleteAsset = deleteAsset;
