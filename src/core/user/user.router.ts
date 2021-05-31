import express from "express";

import { checkAuth } from "../../config/jwt";
const router = express.Router();

import { healthCheck, login, signup } from "./user.controller";

router.get("/healthcheck", healthCheck);
router.get("/jwtprotect", checkAuth, (req, res) => {
  res.send("yay! its working!");
});

router.post("/login", login);
router.post("/signup", signup);

export default router;
