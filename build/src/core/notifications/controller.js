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
exports.updateNotification = exports.checkNotification = exports.createNotification = void 0;
const model_1 = __importDefault(require("./model"));
const service_1 = require("./service");
const default_logger_1 = require("../../utils/default.logger");
const nanoid_1 = require("nanoid");
const mysqlConnection_1 = require("../../utils/mysqlConnection");
const { Sequelize } = require("sequelize");
const Op = Sequelize.Op;
const createNotification = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const notificationID = "notificationID-" + nanoid_1.nanoid();
        req.body.sender = res.locals.jwtPayload["userID"];
        req.body.notificationID = notificationID;
        yield mysqlConnection_1.sequelize.sync();
        const new_notification = yield service_1.createNotification_service({ Notification: model_1.default, reqBody: req.body });
        if (new_notification) {
            return res.status(200).json({ message: "Notification created successfully", notificationID: notificationID });
        }
        else {
            return res.status(400).json({ message: "Error in inserting new record" });
        }
    }
    catch (err) {
        default_logger_1.logger.error(err);
        return res.status(500).json({ message: "Something went wrong 😕", error: err });
    }
});
exports.createNotification = createNotification;
const checkNotification = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sender = req.body.sender;
        const getNotifications = yield service_1.checkNotification_service({ sequelize: mysqlConnection_1.sequelize, sender: sender });
        if (getNotifications) {
            return res.status(200).json({ message: "These are the notifications", notifications: getNotifications });
        }
        else {
            return res.status(400).json({ message: "Something went wrong" });
        }
    }
    catch (err) {
        default_logger_1.logger.error(err);
        return res.status(500).json({ message: "Something went wrong 😕", error: err });
    }
});
exports.checkNotification = checkNotification;
const updateNotification = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const changes = req.body.changes;
        const notificationID = req.params.notificationID;
        const isUpdated = yield service_1.updateNotification_service({ Notification: model_1.default, changes: changes, notificationID: notificationID });
        if (isUpdated) {
            return res.status(200).json({ message: "Notification updated successfully" });
        }
        else {
            return res.status(400).json({ message: "Something went wrong while updating the Notification" });
        }
    }
    catch (err) {
        default_logger_1.logger.error(err);
        return res.status(500).json({ message: "Something went wrong 😕", error: err });
    }
});
exports.updateNotification = updateNotification;
