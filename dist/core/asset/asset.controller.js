"use strict";
// getAllAssets;
// getAsset;
// getSome;
// addAsset;
// updateAsset;
// deleteAsset;
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.assetHealthcheck = exports.rentAsset = exports.addAsset = exports.getAllAssets = void 0;
const environment_1 = __importDefault(require("../../config/environment"));
const transaction_service_1 = require("../transaction/transaction.service");
const user_service_1 = require("../user/user.service");
const asset_service_1 = require("./asset.service");
// remove in prod
async function assetHealthcheck(req, res) {
    res.send("healthy");
}
exports.assetHealthcheck = assetHealthcheck;
const getAllAssets = async (req, res) => {
    const assets = await asset_service_1.getAllAssets_service();
    res.status(200).json(assets);
};
exports.getAllAssets = getAllAssets;
const addAsset = async (req, res) => {
    const { insuranceAmt, title, category, description, price, interval } = req.body;
    const owner = res.locals.jwtPayload.userID;
    const newAsset = await asset_service_1.addAsset_service({
        insurance_amt: insuranceAmt,
        title: title,
        category: category,
        description: description,
        price: price,
        owner: owner,
        interval: interval,
    });
    if (newAsset)
        return res.status(200).send({ messasge: "Success" });
    return res.status(500).send({ message: "Something went wrong" });
};
exports.addAsset = addAsset;
const rentAsset = async (req, res) => {
    const { assetID } = req.body;
    const { userID } = res.locals.jwtPayload;
    let renter = userID;
    try {
        const currentWalletAmt = await user_service_1.getUserWallet_service(renter);
        let asset = await asset_service_1.getAsset_service(assetID);
        let owner = asset.owner;
        // check wallet amount if less than WALLET_LIMIT
        // return to user saying wallet is low pls recharge
        if (currentWalletAmt <= environment_1.default.WALLET_LIMIT)
            return res.status(200).send({
                message: "insufficient balance",
                status: "insufficient_balance",
            });
        // check if transaction already exists query with assetID renter and rentee
        // else make a transaction and store into the table
        if (await transaction_service_1.checkExistingTransaction_service(renter, owner, assetID)) {
            return res.status(200).send({
                message: "Request already raised",
                status: "request_already_raised",
            });
        }
        // store in transaction table
        transaction_service_1.addTransaction_service(renter, owner, assetID);
        return res.status(200).send({
            message: "Request Raised",
            status: "request_raised",
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: "Something went wrong" });
    }
};
exports.rentAsset = rentAsset;
