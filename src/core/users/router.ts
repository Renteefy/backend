import { Router } from "express";
import { checkUser, getAllUsers, storeLoginDetails, getUserInfo, userLogin, patchUserInfo, getDashboardInfo } from "./controller";
import JWT from "../../utils/jwt";

export const userRouter = Router();

userRouter.get("/getAll", getAllUsers);
userRouter.post("/checkUser", checkUser);
userRouter.post("/storeLoginDetails", storeLoginDetails);
userRouter.post("/userLogin", userLogin);
userRouter.get("/getUserInfo", JWT.checkJWT, getUserInfo);
userRouter.get("/getDashboardInfo", JWT.checkJWT, getDashboardInfo);
userRouter.patch("/patchUserInfo", JWT.checkJWT, patchUserInfo);
