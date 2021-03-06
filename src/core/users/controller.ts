import { Request, Response, urlencoded } from "express";
import userModel from "./model";
import assetModel from "../assets/model";
import { logger } from "../../utils/default.logger";
import { getAllUsers_service, storeLoginDetails_service, getUserInfo_service, patchUserInfo_service } from "./service";
import { nanoid } from "nanoid";
import IUser from "./interface";
import JWT from "../../utils/jwt";
import { listAssets_service } from "../assets/service";

// This needs to be deleted
const getAllUsers = async (req: Request, res: Response) => {
	const users = await getAllUsers_service({ User: userModel });
	res.send(users);
};

// Checks if the email ID is already present in the database
const checkUser = async (req: Request, res: Response) => {
	try {
		const email = req.body.email;
		if (email === null || email === undefined || email.length === 0) {
			return res.status(401).json({
				message: "Auth Failed 😕",
				deleteLater: "Email is literally empty",
			});
		}
		const users = await getAllUsers_service({ User: userModel, param: { email: email } });

		if (users === null || users.length === 0) {
			return res.status(200).json({
				message: "All good 😁",
				deleteLater: "Given email does not exist in the database",
			});
		} else {
			return res.status(400).json({
				message: "Auth Failed 😕",
				deleteLater: "Given email exists in the database",
			});
		}
	} catch (err) {
		logger.error(err);
		return res.status(500).json({ message: "Something went wrong 👀", error: err });
	}
};

// Whenever the user logs in for the first time, this function is called
const storeLoginDetails = async (req: Request, res: Response) => {
	try {
		for (var i of ["firstName", "lastName", "email", "username"]) {
			if (req.body[i] === null || req.body[i] === undefined || req.body[i].length === 0) {
				return res.status(400).json({
					message: "Failure 😕",
					deleteLater: i + " - this field is missing in the request body",
				});
			}
		}
		const userID = "userID-" + nanoid();
		const token = JWT.signJWT(userID);
		req.body.userID = userID;
		const isUserCreated = await storeLoginDetails_service({
			User: userModel,
			reqBody: req.body,
		});
		if (isUserCreated) {
			return res.status(200).json({ message: "Stored Successfully 😁", token: token });
		} else {
			return res.status(500).json({ message: "Something went wrong 😕" });
		}
	} catch (err) {
		logger.error(err);
		return res.status(500).json({ message: "Something went wrong 😕", error: err });
	}
};

// logs in the user
const userLogin = async (req: Request, res: Response) => {
	try {
		const email = req.body.email;
		if (email === null || email === undefined || email.length === 0) {
			return res.status(401).json({
				message: "Auth Failed 😕",
				deleteLater: "Email is literally empty",
			});
		}

		const users = await getAllUsers_service({ User: userModel, param: { email: email } });
		if (users !== undefined && users !== null && users.length !== 0) {
			const token = JWT.signJWT(users[0]["userID"]);
			return res.status(200).json({
				message: "All good 😁",
				deleteLater: "User logged in",
				token: token,
			});
		} else {
			return res.status(400).json({
				message: "Auth Failed 😕",
				deleteLater: "Given email does not exist in the database",
			});
		}
	} catch (err) {
		logger.error(err);
		return res.status(500).json({ message: "Something went wrong 😕", error: err });
	}
};

//cache
const getUserInfo = async (req: Request, res: Response) => {
	try {
		const userID = res.locals.jwtPayload["userID"];
		const userInfo = await getUserInfo_service({ User: userModel, userID: userID });
		if (userInfo) {
			return res.status(200).json({ message: "Success 😁", userInfo: userInfo });
		} else {
			return res.status(400).json({
				message: "Failure 😕",
				deleteLater: "Something went wrong bro, idk",
			});
		}
	} catch (err) {
		logger.error(err);
		return res.status(500).json({ message: "Something went wrong 😕", error: err });
	}
};

const patchUserInfo = async (req: Request, res: Response) => {
	try {
		const userID = res.locals.jwtPayload["userID"];
		const isUpdated = await patchUserInfo_service({
			User: userModel,
			userID: userID,
			updates: req.body.updates,
		});
		if (isUpdated) {
			return res.status(200).json({ message: "User info updated sucessfully 😁" });
		} else {
			return res.status(400).json({
				message: "Failure 😕",
				deleteLater: "Something went wrong bro, idk",
			});
		}
	} catch (err) {
		logger.error(err);
		return res.status(500).json({ message: "Something went wrong 😕", error: err });
	}
};

const getDashboardInfo = async (req: Request, res: Response) => {
	try {
		const userID = res.locals.jwtPayload["userID"];
		const assets = await listAssets_service({ Asset: assetModel, param: { owner: userID } });
		// add services here once the model is done
		if (assets) {
			return res.status(200).json({ ownedAsset: assets, rentedAsset: [], requestedAssets: [] });
		} else {
			return res.status(400).json({
				message: "Failure 😕",
				deleteLater: "Something went wrong bro, idk",
			});
		}
	} catch (err) {
		logger.error(err);
		return res.status(500).json({ message: "Something went wrong 😕", error: err });
	}
};
export { getAllUsers, checkUser, storeLoginDetails, getUserInfo, userLogin, patchUserInfo, getDashboardInfo };
