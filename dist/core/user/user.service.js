"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsername_service = exports.getUserInfo_service = exports.addUser_service = exports.getUserWallet_service = exports.getUserObjFromEmail_service = void 0;
const mongo_connection_1 = require("../../config/mongo.connection");
async function getUserObjFromEmail_service(email) {
    try {
        const userCollection = mongo_connection_1.getMongoClient().collection("users");
        const user = await userCollection.findOne({ email: email });
        return user;
    }
    catch (error) {
        console.log(error);
        return null;
    }
}
exports.getUserObjFromEmail_service = getUserObjFromEmail_service;
async function addUser_service(newUser) {
    try {
        const userCollection = mongo_connection_1.getMongoClient().collection("users");
        const user = await userCollection.insertOne(newUser);
        if (user)
            return true;
        return false;
    }
    catch (error) {
        console.log(error);
        return false;
    }
}
exports.addUser_service = addUser_service;
// takes in a userID returns a username
async function getUsername_service(userID) {
    const userCollection = mongo_connection_1.getMongoClient().collection("users");
    const user = await userCollection.findOne({ userID: userID });
    if (user)
        return user.username;
    return "";
}
exports.getUsername_service = getUsername_service;
async function getUserWallet_service(userID) {
    const userCollection = mongo_connection_1.getMongoClient().collection("users");
    const user = await userCollection.findOne({ userID: userID });
    return user.wallet;
}
exports.getUserWallet_service = getUserWallet_service;
async function getUserInfo_service(userID) {
    try {
        const userInfo = await mongo_connection_1.getMongoClient()
            .collection("user")
            .findOne({ userID: userID });
        return {
            email: userInfo.email,
            username: userInfo.username,
            name: userInfo.name,
            renterStars: userInfo.renterStars,
            renteeStars: userInfo.renteeStars,
            isRenter: userInfo.isRenter,
            isRentee: userInfo.isRentee,
        };
    }
    catch (error) {
        console.log(error);
        return {};
    }
}
exports.getUserInfo_service = getUserInfo_service;
