"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAsset_service = exports.addAsset_service = exports.getAllAssets_service = void 0;
const nanoid_1 = require("nanoid");
const asset_model_1 = require("../../model/asset.model");
async function getAllAssets_service() {
    return await asset_model_1.Asset.find({});
}
exports.getAllAssets_service = getAllAssets_service;
async function getAsset_service(assetID) {
    const assets = await asset_model_1.Asset.find({ assetID: assetID });
    return assets[0];
}
exports.getAsset_service = getAsset_service;
async function addAsset_service(asset) {
    try {
        const success = await asset_model_1.Asset.save({
            ...asset,
            assetID: "asset-" + nanoid_1.nanoid(),
        });
        if (success)
            return true;
        return false;
    }
    catch (error) {
        console.log(error);
        return false;
    }
}
exports.addAsset_service = addAsset_service;
