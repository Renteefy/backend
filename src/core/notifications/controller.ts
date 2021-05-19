import { Request, Response, urlencoded } from "express";
import notificationModel from "./model";
import assetModel from "../assets/model";
import { createNotification_service, checkNotification_service, updateNotification_service } from "./service";
import { logger } from "../../utils/default.logger";
import { nanoid } from "nanoid";
import { sequelize } from "../../utils/mysqlConnection";
import { assetRouter } from "../assets/router";
const { Sequelize } = require("sequelize");
const Op = Sequelize.Op;

const createNotification = async (req: Request, res: Response) => {
	try {
		const notificationID = "notificationID-" + nanoid();

		req.body.sender = res.locals.jwtPayload["userID"];
		req.body.notificationID = notificationID;

		await sequelize.sync();

		const new_notification = await createNotification_service({ Notification: notificationModel, reqBody: req.body });
		if (new_notification) {
			return res.status(200).json({ message: "Notification created successfully", notificationID: notificationID });
		} else {
			return res.status(400).json({ message: "Error in inserting new record" });
		}
	} catch (err) {
		logger.error(err);
		return res.status(500).json({ message: "Something went wrong 😕", error: err });
	}
};

const checkNotification = async (req: Request, res: Response) => {
	try {
		const sender = req.body.sender;
		const getNotifications = await checkNotification_service({ sequelize: sequelize, sender: sender });
		if (getNotifications) {
			return res.status(200).json({ message: "These are the notifications", notifications: getNotifications });
		} else {
			return res.status(400).json({ message: "Something went wrong" });
		}
	} catch (err) {
		logger.error(err);
		return res.status(500).json({ message: "Something went wrong 😕", error: err });
	}
};

const updateNotification = async (req: Request, res: Response) => {
	try {
		const changes = req.body.changes;
		const notificationID = req.params.notificationID;
		const isUpdated = await updateNotification_service({ Notification: notificationModel, changes: changes, notificationID: notificationID });
		if (isUpdated) {
			return res.status(200).json({ message: "Notification updated successfully" });
		} else {
			return res.status(400).json({ message: "Something went wrong while updating the Notification" });
		}
	} catch (err) {
		logger.error(err);
		return res.status(500).json({ message: "Something went wrong 😕", error: err });
	}
};

export { createNotification, checkNotification, updateNotification };
