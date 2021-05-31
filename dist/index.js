"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./server"));
const http_1 = __importDefault(require("http"));
const environment_1 = __importDefault(require("./config/environment"));
const port = environment_1.default.PORT;
const app = http_1.default.createServer(server_1.default);
require("reflect-metadata");
app.listen(port, () => {
    console.log(`Listening on port : ${port}`);
});
