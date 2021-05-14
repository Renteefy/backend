"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.disconnectMongo = exports.connectMongo = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const default_logger_1 = require("./default.logger");
const cli_spinner_1 = require("cli-spinner");
const environment_1 = require("../configs/environment");
//Mongo declarations
const MONGO_OPTIONS = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    keepAlive: true,
    authSource: "admin",
    useCreateIndex: true,
};
const MONGO_HOST = `${environment_1.environment.mongoHost}/${environment_1.environment.mongodbName}`;
const MONGO_USERNAME = environment_1.environment.mongoUsername;
const MONGO_PASSWORD = environment_1.environment.mongoPassword;
const mongo = {
    host: MONGO_HOST,
    username: MONGO_USERNAME,
    password: MONGO_PASSWORD,
    options: MONGO_OPTIONS,
    url: `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}`,
};
const connectMongo = () => {
    // decorations
    const spinner = new cli_spinner_1.Spinner("Connecting to Mongodb... %s");
    spinner.setSpinnerString("|/-\\");
    spinner.start();
    mongoose_1.default
        .connect(mongo.url, mongo.options)
        .then(() => {
        spinner.stop(false);
        default_logger_1.logger.info("🟢 Mongodb Connection Opened ");
    })
        .catch((err) => {
        spinner.stop(false);
        default_logger_1.logger.error("🔴 Mongodb Connection failed");
        default_logger_1.logger.info(mongo);
        default_logger_1.logger.error(err);
    });
};
exports.connectMongo = connectMongo;
const disconnectMongo = () => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connection.close();
});
exports.disconnectMongo = disconnectMongo;
