import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";

import userRouter from "./core/user/user.router";
import assetRouter from "./core/asset/asset.router";
import transactionRouter from "./core/transaction/transaction.router";

import { connectMongo } from "./config/mongo.connection";
import { connectMysql } from "./config/mysql.connection";

dotenv.config();
let app = express();
app.use(express.json());
app.use(morgan("short"));

connectMongo();
connectMysql();

app.use("/user", userRouter);
app.use("/asset", assetRouter);
app.use("/transaction", transactionRouter);

export default app;
