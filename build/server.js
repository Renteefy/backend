"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
const express_1 = require("express");
const morgan_1 = require("morgan");
const path_1 = require("path");
const rotating_file_stream_1 = require("rotating-file-stream");
// local imports
const user_router_1 = require("./core/user/user.router");
const mongodbConnection_1 = require("./utils/mongodbConnection");
const app = express_1.default();
app.use(express_1.default.json());
// database connection
mongodbConnection_1.connectMongo();
// logging incoming request
let accessLogStream = rotating_file_stream_1.createStream("request.log", {
    interval: "1d",
    path: path_1.default.join("./logs"),
});
app.use(morgan_1.default("combined", { stream: accessLogStream }));
app.use(morgan_1.default("tiny"));
// routers
app.use("/user", user_router_1.userRouter);
// health check
app.get("/", (req, res) => res.send("⚡Renteefy server online 🟢"));
app.use((req, res, next) => {
    res.status(404).json("Route Unavailable 😕");
});
exports.server = app;
