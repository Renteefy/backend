import { Request, Response, urlencoded } from "express";
import userModel from "./user.model";
import { logger } from "../../utils/default.logger";
import { listUsers } from "./user.service";
import { nanoid } from "nanoid";
import IUser from "./user.interface";
import JWT from "../../utils/jwt";

// This needs to be deleted
const getAllUsers = async (req: Request, res: Response) => {
	const users = await listUsers({ User: userModel });
	res.send(users);
};

// Checks if the email ID is already present in the database
const checkUser = async (req: Request, res: Response) => {
	try {
		const email = req.body.email;
		if (email === null || email === undefined || email.length === 0) {
			return res.status(400).json({ message: "Auth Failed", deleteLater: "Email is literally empty" });
		}
		const users = await listUsers({ User: userModel, param: { email: email } });

		if (users === null || users.length === 0) {
			return res.status(200).json({ message: "All good", deleteLater: "Given email does not exist in the database" });
		} else {
			return res.status(400).json({ message: "Auth Failed", deleteLater: "Given email exists in the database" });
		}
	} catch (err) {
		logger.error(err);
		return res.status(500).json({ message: "Something went wrong", error: err });
	}
};

// Whenever the user logs in for the first time, this function is called
const storeLoginDetails = async (req: Request, res: Response) => {
	try {
		for (var i of ["firstName", "lastName", "email", "username"]) {
			if (req.body[i] === null || req.body[i] === undefined || req.body[i].length === 0) {
				return res.status(400).json({ message: "Failure", deleteLater: i + " - this field is missing in the request body" });
			}
		}
		const userID = nanoid();
		const token = JWT.signJWT(userID);
		const user: IUser = await userModel.create({
			userID: userID,
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			username: req.body.username,
			email: req.body.email,
		});
		return res.status(200).json({ message: "Stored Successfully", token: token });
	} catch (err) {
		logger.error(err);
		return res.status(500).json({ message: "Something went wrong", error: err });
	}
};

// logs in the user
const userLogin = async (req: Request, res: Response) => {
	try {
		const email = req.body.email;
		if (email === null || email === undefined || email.length === 0) {
			return res.status(400).json({ message: "Auth Failed", deleteLater: "Email is literally empty" });
		}

		const users = await listUsers({ User: userModel, param: { email: email } });
		if (users !== null || users.length !== 0) {
			const token = JWT.signJWT(users[0]["userID"]);
			return res.status(200).json({ message: "All good", deleteLater: "User logged in", token: token });
		} else {
			return res.status(400).json({ message: "Auth Failed", deleteLater: "Given email does not exist in the database" });
		}
	} catch (err) {
		logger.error(err);
		return res.status(500).json({ message: "Something went wrong", error: err });
	}
};

const getUserInfo = async (req: Request, res: Response) => {
	try {
		const userID = res.locals.jwtPayload["userID"];
		const userInfo = await userModel.findOne({ userID: userID }).select("email username firstName lastName renterStars renteeStars isRenter isRentee").exec();
		if (userInfo !== null) {
			return res.status(200).json({ message: "Success", userInfo: userInfo });
		} else {
			return res.status(400).json({ message: "Failure", deleteLater: "Something went wrong bro, idk" });
		}
	} catch (err) {
		logger.error(err);
		return res.status(500).json({ message: "Something went wrong", error: err });
	}
};

const patchUserInfo = async (req: Request, res: Response) => {
	try {
		const userID = res.locals.jwtPayload["userID"];
		const update = await userModel.updateOne({ userID: userID }, { $set: req.body.updates });
		console.log(update);
		if (update) {
			return res.status(200).json({ message: "User info updated sucessfully" });
		} else {
			return res.status(400).json({ message: "Failure", deleteLater: "Something went wrong bro, idk" });
		}
	} catch (err) {
		logger.error(err);
		return res.status(500).json({ message: "Something went wrong", error: err });
	}
};

const getDashboardInfo = async (req: Request, res: Response) => {
	// this needs to be written after the assets/services db is ready
};
export { getAllUsers, checkUser, storeLoginDetails, getUserInfo, userLogin, patchUserInfo };
