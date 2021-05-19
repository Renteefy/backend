import { Router } from "express";
import { createNotification, checkNotification, updateNotification } from "./controller";
import JWT from "../../utils/jwt";

export const notificationRouter = Router();

// POST requests
notificationRouter.post("/createNotification", JWT.checkJWT, createNotification);
notificationRouter.post("/checkNotification", JWT.checkJWT, checkNotification);

// PATCH requests
notificationRouter.patch("/updateNotification/:notificationID", JWT.checkJWT, updateNotification);
