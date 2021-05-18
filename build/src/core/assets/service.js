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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAsset_service = exports.updateAsset_service = exports.getSome_service = exports.getAsset_service = exports.addAsset_service = exports.listAssets_service = void 0;
const service_1 = require("../users/service");
const listAssets_service = ({ Asset, param = null }) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Asset.findAll({ where: param });
});
exports.listAssets_service = listAssets_service;
const addAsset_service = ({ Asset, reqBody }) => __awaiter(void 0, void 0, void 0, function* () {
    const new_asset = yield Asset.create({
        assetID: reqBody.assetID,
        title: reqBody.title,
        category: reqBody.category,
        description: reqBody.description,
        price: reqBody.price,
        interval: reqBody.interval,
        owner: reqBody.userID,
    });
    if (new_asset) {
        return new_asset;
    }
    else {
        return false;
    }
});
exports.addAsset_service = addAsset_service;
const getAsset_service = ({ Asset, assetID, User }) => __awaiter(void 0, void 0, void 0, function* () {
    // add code to return user info also
    const asset = yield Asset.findOne({ assetID: assetID });
    if (asset) {
        const userID = asset["owner"];
        const userInfo = yield service_1.getUserInfo_service({ User: User, userID: userID });
        const user = { id: userID, name: userInfo["username"], renteeStars: userInfo["renteeStars"], renterStars: userInfo["renterStars"] };
        return { asset: asset, user: user };
    }
    else {
        return { asset: false, user: false };
    }
});
exports.getAsset_service = getAsset_service;
const getSome_service = ({ Asset, arr, Op }) => __awaiter(void 0, void 0, void 0, function* () {
    const assets = yield Asset.findAll({ where: { assetID: { [Op.notIn]: arr } } });
    if (assets) {
        return assets;
    }
    else {
        return false;
    }
});
exports.getSome_service = getSome_service;
const updateAsset_service = ({ Asset, changes, assetID }) => __awaiter(void 0, void 0, void 0, function* () {
    const assets = yield Asset.update(changes, { where: { assetID: assetID } });
    if (assets[0]) {
        return assets;
    }
    else {
        return false;
    }
});
exports.updateAsset_service = updateAsset_service;
const deleteAsset_service = ({ Asset, assetID }) => __awaiter(void 0, void 0, void 0, function* () {
    const asset = yield Asset.destroy({ where: { assetID: assetID } });
    console.log(asset);
    if (asset) {
        return true;
    }
    else {
        return false;
    }
});
exports.deleteAsset_service = deleteAsset_service;
