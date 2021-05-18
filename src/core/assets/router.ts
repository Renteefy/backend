import { Router } from "express";
import { getAllAssets, addAsset, getAsset, getSome, updateAsset, deleteAsset } from "./controller";
import JWT from "../../utils/jwt";

export const assetRouter = Router();

// GET requests
assetRouter.get("/getAllAssets", JWT.checkJWT, getAllAssets);
assetRouter.get("/getAsset/:assetID", JWT.checkJWT, getAsset);
assetRouter.get("/getSome", JWT.checkJWT, getSome);

// POST requests
assetRouter.post("/addAsset", JWT.checkJWT, addAsset);

// PATCH requests
assetRouter.patch("/updateAsset/:assetID", JWT.checkJWT, updateAsset);

// DELETE requests
assetRouter.delete("/deleteAsset/:assetID", JWT.checkJWT, deleteAsset);
