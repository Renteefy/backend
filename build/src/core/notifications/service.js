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
exports.updateNotification_service = exports.checkNotification_service = exports.createNotification_service = void 0;
const { QueryTypes } = require("sequelize");
const notifiMessages_1 = require("../../utils/notifiMessages");
const createNotification_service = ({ Notification, reqBody }) => __awaiter(void 0, void 0, void 0, function* () {
    // add null checks
    const new_notification = yield Notification.create({
        notificationID: reqBody.notificationID,
        owner: reqBody.owner,
        sender: reqBody.sender,
        renter: reqBody.renter,
        itemID: reqBody.itemID,
    });
    if (new_notification) {
        return new_notification;
    }
    else {
        return false;
    }
});
exports.createNotification_service = createNotification_service;
const checkNotification_service = ({ sequelize, sender }) => __awaiter(void 0, void 0, void 0, function* () {
    // add null checks
    const getNotifications = yield sequelize.query(`
    SELECT notifications.notificationID, assets.assetID, assets.title, assets.image_urls, notifications.status, notifications.renter, notifications.owner
    FROM notifications 
    JOIN assets ON assets.assetID = notifications.itemID 
    WHERE notifications.renter = ? or notifications.owner = ?`, {
        replacements: [sender, sender],
        type: QueryTypes.SELECT,
    });
    for (var notifi of getNotifications) {
        notifi["message"] = notifiMessages_1.notifiMessages({ status: notifi["status"], owner: notifi["owner"], renter: notifi["renter"], sender: sender });
    }
    if (getNotifications) {
        return getNotifications;
    }
    else {
        return false;
    }
});
exports.checkNotification_service = checkNotification_service;
const updateNotification_service = ({ Notification, changes, notificationID }) => __awaiter(void 0, void 0, void 0, function* () {
    const notifis = yield Notification.update(changes, { where: { notificationID: notificationID } });
    if (notifis[0]) {
        return notifis;
    }
    else {
        return false;
    }
});
exports.updateNotification_service = updateNotification_service;
