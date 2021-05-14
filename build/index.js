"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server");
const environment_1 = require("./configs/environment");
const default_logger_1 = require("./utils/default.logger");
// TODO: add https to localhost
switch (environment_1.environment.nodeEnv) {
    case "dev":
        server_1.server.listen(environment_1.environment.port, () => {
            default_logger_1.logger.info("Server Online -- dev");
        });
        break;
    case "staging":
        server_1.server.listen(environment_1.environment.port, () => {
            default_logger_1.logger.info("Server Online -- staging");
        });
        break;
    case "prod":
        server_1.server.listen(environment_1.environment.port, () => {
            default_logger_1.logger.info("Server Online -- prod");
        });
        break;
    case "test":
        server_1.server.listen(5000);
        break;
    default:
        default_logger_1.logger.info("Env not defined");
}
