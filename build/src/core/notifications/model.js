"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { Sequelize, Model, DataTypes } = require("sequelize");
const mysqlConnection_1 = require("../../utils/mysqlConnection");
class Notifications extends Model {
}
Notifications.init({
    notificationID: { type: DataTypes.STRING, primaryKey: true, unique: true },
    owner: DataTypes.STRING,
    renter: DataTypes.STRING,
    sender: DataTypes.STRING,
    itemID: DataTypes.STRING,
    notificationType: DataTypes.STRING,
    isDisabled: { type: DataTypes.BOOLEAN, defaultValue: false },
    status: { type: DataTypes.STRING, defaultValue: "Request Raised" },
}, { sequelize: mysqlConnection_1.sequelize, modelName: "notifications" });
exports.default = Notifications;
