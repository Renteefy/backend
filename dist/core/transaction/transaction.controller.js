"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllTransaction = exports.getTransaction = void 0;
const transaction_service_1 = require("./transaction.service");
async function getTransaction(req, res) {
    const { transactionID } = req.body;
    const transaction = await transaction_service_1.getTransaction_service(transactionID);
    res.status(200).send({ ...transaction, id: undefined });
}
exports.getTransaction = getTransaction;
async function getAllTransaction(req, res) {
    const { userID } = res.locals.jwtPayload;
    const transactions = await transaction_service_1.getAllTransaction_service(userID);
    res.status(200).send({ transactions });
}
exports.getAllTransaction = getAllTransaction;
