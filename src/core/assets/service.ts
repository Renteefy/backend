import { any } from "sequelize/types/lib/operators";
import { logger } from "../../utils/default.logger";
import { findUserInfo } from "../users/service";

const listAssets = async ({ Asset, param = null }: { Asset: any; param?: any }) => {
	return await Asset.findAll({ where: param });
};

const insertAsset = async ({ Asset, reqBody }: { Asset: any; reqBody: any }) => {
	const new_asset = await Asset.create({
		assetID: reqBody.assetID,
		title: reqBody.title,
		category: reqBody.category,
		description: reqBody.description,
		price: reqBody.price,
		interval: reqBody.interval,
		owner: reqBody.userID,
	});
	if (new_asset) {
		return new_asset;
	} else {
		return false;
	}
};

const fetchAsset = async ({ Asset, assetID, User }: { Asset: any; assetID: String; User: any }) => {
	// add code to return user info also
	const asset = await Asset.findOne({ assetID: assetID });
	if (asset) {
		const userID = asset["owner"];
		const userInfo = await findUserInfo({ User: User, userID: userID });
		const user = { id: userID, name: userInfo["username"], renteeStars: userInfo["renteeStars"], renterStars: userInfo["renterStars"] };
		return { asset: asset, user: user };
	} else {
		return { asset: false, user: false };
	}
};

const filteredFetch = async ({ Asset, arr, Op }: { Asset: any; arr: Array<String>; Op: any }) => {
	const assets = await Asset.findAll({ where: { assetID: { [Op.notIn]: arr } } });
	if (assets) {
		return assets;
	} else {
		return false;
	}
};

export { listAssets, insertAsset, fetchAsset, filteredFetch };
