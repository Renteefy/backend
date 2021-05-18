import express from "express";
import morgan from "morgan";
import path from "path";
import { createStream } from "rotating-file-stream";
// local imports
import { userRouter } from "./core/users/router";
import { assetRouter } from "./core/assets/router";
import { connectMongo } from "./utils/mongodbConnection";

const app: express.Application = express();
app.use(express.json());

// database connection
connectMongo();

// logging incoming request
let accessLogStream = createStream("request.log", {
	interval: "1d",
	path: path.join("./logs"),
});
app.use(morgan("combined", { stream: accessLogStream }));
app.use(morgan("tiny"));

// routers
app.use("/user", userRouter);
app.use("/asset", assetRouter);

// health check
app.get("/", (req: express.Request, res: express.Response) => res.send("⚡Renteefy server online 🟢"));

app.use((req, res, next) => {
	res.status(404).json("Route Unavailable 😕");
});

export const server = app;
