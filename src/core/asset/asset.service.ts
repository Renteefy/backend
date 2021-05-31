import { nanoid } from "nanoid";
import { Asset } from "../../model/asset.model";

async function getAllAssets_service() {
  return await Asset.find({});
}

async function getAsset_service(assetID: string): Promise<Asset> {
  const assets = await Asset.find({ assetID: assetID });
  return assets[0];
}

async function addAsset_service(asset: any) {
  try {
    const success = await Asset.save({
      ...asset,
      assetID: "asset-" + nanoid(),
    });
    if (success) return true;
    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export { getAllAssets_service, addAsset_service, getAsset_service };
