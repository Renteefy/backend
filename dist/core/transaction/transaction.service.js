"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllTransaction_service = exports.checkExistingTransaction_service = exports.addTransaction_service = exports.getTransaction_service = void 0;
const nanoid_1 = require("nanoid");
const typeorm_1 = require("typeorm");
const transaction_model_1 = require("../../model/transaction.model");
const user_service_1 = require("../user/user.service");
async function addTransaction_service(renter, owner, assetID) {
    try {
        const newTransaction = new transaction_model_1.Transaction();
        newTransaction.renter = renter;
        newTransaction.owner = owner;
        newTransaction.status = "REQUEST_RAISED";
        newTransaction.tranID = "transaction-" + nanoid_1.nanoid();
        newTransaction.assetID = assetID;
        newTransaction.save();
        return true;
    }
    catch (error) {
        console.log(error);
        return false;
    }
}
exports.addTransaction_service = addTransaction_service;
async function getTransaction_service(transactionID) {
    return (await transaction_model_1.Transaction.findOne({ tranID: transactionID })) || null;
}
exports.getTransaction_service = getTransaction_service;
async function getAllTransaction_service(userID) {
    const transactions = typeorm_1.getRepository(transaction_model_1.Transaction).find({
        where: [{ renter: userID }, { owner: userID }],
    });
    let newObj = (await transactions).map(async (transaction) => {
        transaction.renter = await user_service_1.getUsername_service(transaction.renter);
        transaction.owner = await user_service_1.getUsername_service(transaction.owner);
        return transaction;
    });
    console.log(newObj);
    return Promise.all(newObj);
}
exports.getAllTransaction_service = getAllTransaction_service;
async function checkExistingTransaction_service(owner, renter, assetID) {
    const transaction = await transaction_model_1.Transaction.findOne({
        renter,
        owner,
        assetID,
    });
    if (transaction === undefined) {
        return false;
    }
    return true;
}
exports.checkExistingTransaction_service = checkExistingTransaction_service;
