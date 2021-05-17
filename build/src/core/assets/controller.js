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
exports.getSome = exports.getAsset = exports.addAsset = exports.getAllAssets = void 0;
const model_1 = __importDefault(require("./model"));
const service_1 = require("./service");
const default_logger_1 = require("../../utils/default.logger");
const nanoid_1 = require("nanoid");
const mysqlConnection_1 = require("../../utils/mysqlConnection");
const { Sequelize } = require("sequelize");
const Op = Sequelize.Op;
const getAllAssets = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const assets = yield service_1.listAssets({ Asset: model_1.default });
    res.status(200).json(assets);
});
exports.getAllAssets = getAllAssets;
const addAsset = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const assetID = nanoid_1.nanoid();
        const userID = res.locals.jwtPayload["userID"];
        req.body.assetID = assetID;
        req.body.userID = userID;
        yield mysqlConnection_1.sequelize.sync();
        const new_asset = yield service_1.insertAsset({ Asset: model_1.default, reqBody: req.body });
        if (new_asset) {
            return res.status(200).json({ message: "Asset added successfully", assetID: assetID });
        }
        else {
            return res.status(400).json({ message: "Error in insert new record" });
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
        const asset = yield service_1.fetchAsset({ Asset: model_1.default, assetID: assetID });
        if (asset) {
            return res.status(200).json({ message: "This is the asset", asset: asset });
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
        const assets = yield service_1.filteredFetch({ Asset: model_1.default, arr: arr, Op: Op });
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
