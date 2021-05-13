import { server } from "./server";
import { environment } from "./configs/environment";
import { logger } from "./utils/default.logger";

// TODO: add https to localhost

switch (environment.nodeEnv) {
  case "dev":
    server.listen(environment.port, () => {
      logger.info("Server Online -- dev");
    });
    break;
  case "staging":
    server.listen(environment.port, () => {
      logger.info("Server Online -- staging");
    });
    break;
  case "prod":
    server.listen(environment.port, () => {
      logger.info("Server Online -- prod");
    });
    break;
  case "test":
    server.listen(5000);
    break;
  default:
    logger.info("Env not defined");
}
