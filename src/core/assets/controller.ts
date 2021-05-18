import { Request, Response, urlencoded } from "express";
import assetModel from "./model";
import userModel from "../users/model";
import { listAssets_service, addAsset_service, getAsset_service, getSome_service, updateAsset_service, deleteAsset_service } from "./service";
import { logger } from "../../utils/default.logger";
import { nanoid } from "nanoid";
import IInterface from "./interface";
import { sequelize } from "../../utils/mysqlConnection";
const { Sequelize } = require("sequelize");
const Op = Sequelize.Op;

const getAllAssets = async (req: Request, res: Response) => {
	const assets = await listAssets_service({ Asset: assetModel });
	res.status(200).json(assets);
};

const addAsset = async (req: Request, res: Response) => {
	try {
		const assetID = "assetID-" + nanoid();
		const userID = res.locals.jwtPayload["userID"];
		req.body.assetID = assetID;
		req.body.userID = userID;
		await sequelize.sync();
		const new_asset = await addAsset_service({ Asset: assetModel, reqBody: req.body });
		if (new_asset) {
			return res.status(200).json({ message: "Asset added successfully", assetID: assetID });
		} else {
			return res.status(400).json({ message: "Error in insert new record" });
		}
	} catch (err) {
		logger.error(err);
		return res.status(500).json({ message: "Something went wrong 😕", error: err });
	}
};

const getAsset = async (req: Request, res: Response) => {
	try {
		const assetID = req.params.assetID;
		const { asset, user } = await getAsset_service({ Asset: assetModel, assetID: assetID, User: userModel });

		if (asset) {
			return res.status(200).json({ message: "This is the asset and the owner", asset: asset, owner: user });
		} else {
			return res.status(400).json({ message: "Unable to find asset" });
		}
	} catch (err) {
		logger.error(err);
		return res.status(500).json({ message: "Something went wrong 😕", error: err });
	}
};

const getSome = async (req: Request, res: Response) => {
	try {
		const arr = req.body.arr;
		const assets = await getSome_service({ Asset: assetModel, arr: arr, Op: Op });
		if (assets) {
			return res.status(200).json({ message: "These are the asset", asset: assets });
		} else {
			return res.status(400).json({ message: "Unable to find assets" });
		}
	} catch (err) {
		logger.error(err);
		return res.status(500).json({ message: "Something went wrong 😕", error: err });
	}
};

const updateAsset = async (req: Request, res: Response) => {
	try {
		const changes = req.body.changes;
		const assetID = req.params.assetID;
		const isUpdated = await updateAsset_service({ Asset: assetModel, changes: changes, assetID: assetID });
		if (isUpdated) {
			return res.status(200).json({ message: "Asset updated successfully" });
		} else {
			return res.status(400).json({ message: "Something went wrong while updating the asset" });
		}
	} catch (err) {
		logger.error(err);
		return res.status(500).json({ message: "Something went wrong 😕", error: err });
	}
};

const deleteAsset = async (req: Request, res: Response) => {
	try {
		const assetID = req.params.assetID;
		const isDeleted = await deleteAsset_service({ Asset: assetModel, assetID: assetID });
		if (isDeleted) {
			return res.status(200).json({ message: "Asset deleted successfully" });
		} else {
			return res.status(200).json({ message: "Something went wrong while deleting the asset" });
		}
	} catch (err) {
		logger.error(err);
		return res.status(500).json({ message: "Something went wrong 😕", error: err });
	}
};

export { getAllAssets, addAsset, getAsset, getSome, updateAsset, deleteAsset };
