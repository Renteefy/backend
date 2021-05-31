import express from "express";
//import { rentAsset_validator } from "../../config/validator";

import { checkAuth } from "../../config/jwt";
const router = express.Router();

import {
  addAsset,
  assetHealthcheck,
  getAllAssets,
  rentAsset,
} from "./asset.controller";

router.get("/healthcheck", assetHealthcheck);

router.get("/getAllAssets", checkAuth, getAllAssets);
router.post("/addAsset", checkAuth, addAsset);
router.post("/rent", checkAuth, rentAsset);
// router.get("/getSome", checkAuth, getSome);
// router.post("/addAsset", checkAuth, addAsset);
// router.patch("/updateAsset/:assetID", checkAuth, updateAsset);
// router.delete("/deleteAsset/:assetID", checkAuth, deleteAsset);
export default router;
