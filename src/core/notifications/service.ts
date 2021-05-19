const { QueryTypes } = require("sequelize");
import { notifiMessages } from "../../utils/notifiMessages";

const createNotification_service = async ({ Notification, reqBody }: { Notification: any; reqBody: any }) => {
	// add null checks
	const new_notification = await Notification.create({
		notificationID: reqBody.notificationID,
		owner: reqBody.owner,
		sender: reqBody.sender,
		renter: reqBody.renter,
		itemID: reqBody.itemID,
	});
	if (new_notification) {
		return new_notification;
	} else {
		return false;
	}
};

const checkNotification_service = async ({ sequelize, sender }: { sequelize: any; sender: String }) => {
	// add null checks
	const getNotifications = await sequelize.query(
		`
    SELECT notifications.notificationID, assets.assetID, assets.title, assets.image_urls, notifications.status, notifications.renter, notifications.owner
    FROM notifications 
    JOIN assets ON assets.assetID = notifications.itemID 
    WHERE notifications.renter = ? or notifications.owner = ?`,
		{
			replacements: [sender, sender],
			type: QueryTypes.SELECT,
		}
	);

	for (var notifi of getNotifications) {
		notifi["message"] = notifiMessages({ status: notifi["status"], owner: notifi["owner"], renter: notifi["renter"], sender: sender });
	}
	if (getNotifications) {
		return getNotifications;
	} else {
		return false;
	}
};

const updateNotification_service = async ({ Notification, changes, notificationID }: { Notification: any; changes: any; notificationID: any }) => {
	const notifis = await Notification.update(changes, { where: { notificationID: notificationID } });
	if (notifis[0]) {
		return notifis;
	} else {
		return false;
	}
};

export { createNotification_service, checkNotification_service, updateNotification_service };
