import express from "express";
import { checkAuth } from "../../config/jwt";
import { getAllTransaction, getTransaction } from "./transaction.controller";
const Router = express.Router();

Router.post("/getTransaction", checkAuth, getTransaction);
Router.get("/getAllTransaction", checkAuth, getAllTransaction);

export default Router;
