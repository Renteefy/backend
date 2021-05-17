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
exports.filteredFetch = exports.fetchAsset = exports.insertAsset = exports.listAssets = void 0;
const listAssets = ({ Asset, param = null }) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Asset.findAll();
});
exports.listAssets = listAssets;
const insertAsset = ({ Asset, reqBody }) => __awaiter(void 0, void 0, void 0, function* () {
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
exports.insertAsset = insertAsset;
const fetchAsset = ({ Asset, assetID }) => __awaiter(void 0, void 0, void 0, function* () {
    // add code to return user info also
    const asset = yield Asset.findOne({ assetID: assetID });
    if (asset) {
        return asset;
    }
    else {
        return false;
    }
});
exports.fetchAsset = fetchAsset;
const filteredFetch = ({ Asset, arr, Op }) => __awaiter(void 0, void 0, void 0, function* () {
    const assets = yield Asset.findAll({ where: { assetID: { [Op.notIn]: arr } } });
    if (assets) {
        return assets;
    }
    else {
        return false;
    }
});
exports.filteredFetch = filteredFetch;
