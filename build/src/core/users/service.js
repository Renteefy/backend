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
exports.patchUserInfo_service = exports.getUserInfo_service = exports.storeLoginDetails_service = exports.getAllUsers_service = void 0;
const default_logger_1 = require("../../utils/default.logger");
const getAllUsers_service = ({ User, param = null }) => __awaiter(void 0, void 0, void 0, function* () {
    return yield User.find(param);
});
exports.getAllUsers_service = getAllUsers_service;
const storeLoginDetails_service = ({ User, reqBody }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User.create({
            userID: reqBody.userID,
            firstName: reqBody.firstName,
            lastName: reqBody.lastName,
            username: reqBody.username,
            email: reqBody.email,
        });
        default_logger_1.logger.info(user);
        if (user !== undefined || user !== null) {
            return true;
        }
        else {
            return false;
        }
    }
    catch (err) {
        default_logger_1.logger.error(err);
        return false;
    }
});
exports.storeLoginDetails_service = storeLoginDetails_service;
const getUserInfo_service = ({ User, userID }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        default_logger_1.logger.info(userID);
        const userInfo = yield User.findOne({ userID: userID }).select("email username firstName lastName renterStars renteeStars isRenter isRentee").exec();
        if (userInfo === undefined || userInfo === null) {
            return false;
        }
        return userInfo;
    }
    catch (err) {
        default_logger_1.logger.error(err);
        return false;
    }
});
exports.getUserInfo_service = getUserInfo_service;
const patchUserInfo_service = ({ User, userID, updates }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const update = yield User.updateOne({ userID: userID }, { $set: updates });
        if (update === undefined || update === null) {
            return false;
        }
        return true;
    }
    catch (err) {
        default_logger_1.logger.error(err);
        return false;
    }
});
exports.patchUserInfo_service = patchUserInfo_service;
