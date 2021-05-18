import { any } from "sequelize/types/lib/operators";
import { logger } from "../../utils/default.logger";
import { getUserInfo_service } from "../users/service";

const listAssets_service = async ({ Asset, param = null }: { Asset: any; param?: any }) => {
	return await Asset.findAll({ where: param });
};

const addAsset_service = async ({ Asset, reqBody }: { Asset: any; reqBody: any }) => {
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

const getAsset_service = async ({ Asset, assetID, User }: { Asset: any; assetID: String; User: any }) => {
	// add code to return user info also
	const asset = await Asset.findOne({ where: { assetID: assetID } });
	if (asset) {
		const userID = asset["owner"];
		const userInfo = await getUserInfo_service({ User: User, userID: userID });
		const user = { id: userID, name: userInfo["username"], renteeStars: userInfo["renteeStars"], renterStars: userInfo["renterStars"] };
		return { asset: asset, user: user };
	} else {
		return { asset: false, user: false };
	}
};

const getSome_service = async ({ Asset, arr, Op }: { Asset: any; arr: Array<String>; Op: any }) => {
	const assets = await Asset.findAll({ where: { assetID: { [Op.notIn]: arr } } });
	if (assets) {
		return assets;
	} else {
		return false;
	}
};

const updateAsset_service = async ({ Asset, changes, assetID }: { Asset: any; changes: any; assetID: any }) => {
	const assets = await Asset.update(changes, { where: { assetID: assetID } });
	if (assets[0]) {
		return assets;
	} else {
		return false;
	}
};

const deleteAsset_service = async ({ Asset, assetID }: { Asset: any; assetID: String }) => {
	const asset = await Asset.destroy({ where: { assetID: assetID } });
	console.log(asset);
	if (asset) {
		return true;
	} else {
		return false;
	}
};

export { listAssets_service, addAsset_service, getAsset_service, getSome_service, updateAsset_service, deleteAsset_service };
