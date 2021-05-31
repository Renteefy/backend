"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectMysql = void 0;
const typeorm_1 = require("typeorm");
const connectMysql = async () => {
    try {
        await typeorm_1.createConnection();
        console.log("connected to mysql");
        return true;
    }
    catch (error) {
        console.log("could not connected to mysql", error);
        return false;
    }
};
exports.connectMysql = connectMysql;
