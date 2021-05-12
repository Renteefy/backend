import { Router } from "express";
//import JWT from "../../utils/jwt";
//import authedPath from "./controllerFunctions/authedPath";
import storeLoginDetails from "./controllerFunctions/storeLoginDetails";

export const userRouter = Router();

userRouter.post("/storeLoginDetails", storeLoginDetails);
//userRouter.post("/authedPath", JWT.checkJWT, authedPath);
