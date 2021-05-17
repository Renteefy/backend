import { Router } from "express";
import { getAllAssets, addAsset, getAsset, getSome } from "./controller";
import JWT from "../../utils/jwt";

export const assetRouter = Router();
assetRouter.get("/getAllAssets", JWT.checkJWT, getAllAssets);
assetRouter.post("/addAsset", JWT.checkJWT, addAsset);
assetRouter.get("/getAsset/:assetID", JWT.checkJWT, getAsset);
assetRouter.get("/getSome", JWT.checkJWT, getSome);
