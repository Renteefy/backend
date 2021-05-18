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
exports.getDashboardInfo = exports.patchUserInfo = exports.userLogin = exports.getUserInfo = exports.storeLoginDetails = exports.checkUser = exports.getAllUsers = void 0;
const model_1 = __importDefault(require("./model"));
const model_2 = __importDefault(require("../assets/model"));
const default_logger_1 = require("../../utils/default.logger");
const service_1 = require("./service");
const nanoid_1 = require("nanoid");
const jwt_1 = __importDefault(require("../../utils/jwt"));
const service_2 = require("../assets/service");
// This needs to be deleted
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield service_1.getAllUsers_service({ User: model_1.default });
    res.send(users);
});
exports.getAllUsers = getAllUsers;
// Checks if the email ID is already present in the database
const checkUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.body.email;
        if (email === null || email === undefined || email.length === 0) {
            return res.status(401).json({
                message: "Auth Failed 😕",
                deleteLater: "Email is literally empty",
            });
        }
        const users = yield service_1.getAllUsers_service({ User: model_1.default, param: { email: email } });
        if (users === null || users.length === 0) {
            return res.status(200).json({
                message: "All good 😁",
                deleteLater: "Given email does not exist in the database",
            });
        }
        else {
            return res.status(400).json({
                message: "Auth Failed 😕",
                deleteLater: "Given email exists in the database",
            });
        }
    }
    catch (err) {
        default_logger_1.logger.error(err);
        return res.status(500).json({ message: "Something went wrong 👀", error: err });
    }
});
exports.checkUser = checkUser;
// Whenever the user logs in for the first time, this function is called
const storeLoginDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        for (var i of ["firstName", "lastName", "email", "username"]) {
            if (req.body[i] === null || req.body[i] === undefined || req.body[i].length === 0) {
                return res.status(400).json({
                    message: "Failure 😕",
                    deleteLater: i + " - this field is missing in the request body",
                });
            }
        }
        const userID = nanoid_1.nanoid();
        const token = jwt_1.default.signJWT(userID);
        req.body.userID = userID;
        const isUserCreated = yield service_1.storeLoginDetails_service({
            User: model_1.default,
            reqBody: req.body,
        });
        if (isUserCreated) {
            return res.status(200).json({ message: "Stored Successfully 😁", token: token });
        }
        else {
            return res.status(500).json({ message: "Something went wrong 😕" });
        }
    }
    catch (err) {
        default_logger_1.logger.error(err);
        return res.status(500).json({ message: "Something went wrong 😕", error: err });
    }
});
exports.storeLoginDetails = storeLoginDetails;
// logs in the user
const userLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.body.email;
        if (email === null || email === undefined || email.length === 0) {
            return res.status(401).json({
                message: "Auth Failed 😕",
                deleteLater: "Email is literally empty",
            });
        }
        const users = yield service_1.getAllUsers_service({ User: model_1.default, param: { email: email } });
        if (users !== undefined && users !== null && users.length !== 0) {
            const token = jwt_1.default.signJWT(users[0]["userID"]);
            return res.status(200).json({
                message: "All good 😁",
                deleteLater: "User logged in",
                token: token,
            });
        }
        else {
            return res.status(400).json({
                message: "Auth Failed 😕",
                deleteLater: "Given email does not exist in the database",
            });
        }
    }
    catch (err) {
        default_logger_1.logger.error(err);
        return res.status(500).json({ message: "Something went wrong 😕", error: err });
    }
});
exports.userLogin = userLogin;
//cache
const getUserInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userID = res.locals.jwtPayload["userID"];
        const userInfo = yield service_1.getUserInfo_service({ User: model_1.default, userID: userID });
        if (userInfo) {
            return res.status(200).json({ message: "Success 😁", userInfo: userInfo });
        }
        else {
            return res.status(400).json({
                message: "Failure 😕",
                deleteLater: "Something went wrong bro, idk",
            });
        }
    }
    catch (err) {
        default_logger_1.logger.error(err);
        return res.status(500).json({ message: "Something went wrong 😕", error: err });
    }
});
exports.getUserInfo = getUserInfo;
const patchUserInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userID = res.locals.jwtPayload["userID"];
        const isUpdated = yield service_1.patchUserInfo_service({
            User: model_1.default,
            userID: userID,
            updates: req.body.updates,
        });
        if (isUpdated) {
            return res.status(200).json({ message: "User info updated sucessfully 😁" });
        }
        else {
            return res.status(400).json({
                message: "Failure 😕",
                deleteLater: "Something went wrong bro, idk",
            });
        }
    }
    catch (err) {
        default_logger_1.logger.error(err);
        return res.status(500).json({ message: "Something went wrong 😕", error: err });
    }
});
exports.patchUserInfo = patchUserInfo;
const getDashboardInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userID = res.locals.jwtPayload["userID"];
        const assets = yield service_2.listAssets_service({ Asset: model_2.default, param: { owner: userID } });
        // add services here once the model is done
        if (assets) {
            return res.status(200).json({ ownedAsset: assets, rentedAsset: [], requestedAssets: [] });
        }
        else {
            return res.status(400).json({
                message: "Failure 😕",
                deleteLater: "Something went wrong bro, idk",
            });
        }
    }
    catch (err) {
        default_logger_1.logger.error(err);
        return res.status(500).json({ message: "Something went wrong 😕", error: err });
    }
});
exports.getDashboardInfo = getDashboardInfo;
