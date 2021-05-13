import { Router } from "express";
import { getAllUsers } from "./user.controller";
//import JWT from "../../utils/jwt";

export const userRouter = Router();

userRouter.post("/getAll", getAllUsers);
