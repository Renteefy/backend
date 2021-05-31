"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMongoClient = exports.connectMongo = void 0;
const mongodb_1 = require("mongodb");
const environment_1 = __importDefault(require("./environment"));
const uri = environment_1.default.MONGODB_URL;
const client = new mongodb_1.MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const connectMongo = async () => {
    try {
        await client.connect();
        console.log("connected to mongo");
        return true;
    }
    catch (error) {
        return false;
    }
};
exports.connectMongo = connectMongo;
const getMongoClient = () => {
    return client.db(environment_1.default.MONGODB_DATABASE_NAME);
};
exports.getMongoClient = getMongoClient;
