import { logger } from "../../utils/default.logger";

const getAllUsers_service = async ({ User, param = null }: { User: any; param?: any }) => {
	return await User.find(param);
};

const storeLoginDetails_service = async ({ User, reqBody }: { User: any; reqBody: any }) => {
	try {
		const user: any = await User.create({
			userID: reqBody.userID,
			firstName: reqBody.firstName,
			lastName: reqBody.lastName,
			username: reqBody.username,
			email: reqBody.email,
		});
		logger.info(user);
		if (user !== undefined || user !== null) {
			return true;
		} else {
			return false;
		}
	} catch (err) {
		logger.error(err);
		return false;
	}
};

const getUserInfo_service = async ({ User, userID }: { User: any; userID: String }) => {
	try {
		logger.info(userID);
		const userInfo = await User.findOne({ userID: userID }).select("email username firstName lastName renterStars renteeStars isRenter isRentee").exec();
		if (userInfo === undefined || userInfo === null) {
			return false;
		}
		return userInfo;
	} catch (err) {
		logger.error(err);
		return false;
	}
};

const patchUserInfo_service = async ({ User, userID, updates }: { User: any; userID: String; updates: any }) => {
	try {
		const update = await User.updateOne({ userID: userID }, { $set: updates });
		if (update === undefined || update === null) {
			return false;
		}
		return true;
	} catch (err) {
		logger.error(err);
		return false;
	}
};

export { getAllUsers_service, storeLoginDetails_service, getUserInfo_service, patchUserInfo_service };
