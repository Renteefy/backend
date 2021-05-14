"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const log4js_1 = require("log4js");
const environment_1 = require("../configs/environment");
// appenders
log4js_1.configure({
    appenders: {
        console: { type: "stdout", layout: { type: "colored" } },
        dateFile: {
            type: "dateFile",
            filename: `${environment_1.environment.logDir}/${environment_1.environment.logFile}`,
            layout: { type: "basic" },
            compress: true,
            daysToKeep: 14,
            keepFileExt: true,
        },
    },
    categories: {
        default: {
            appenders: ["console", "dateFile"],
            level: environment_1.environment.logLevel,
        },
    },
});
// fetch logger and export
exports.logger = log4js_1.getLogger();
