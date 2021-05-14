import mongoose from "mongoose";
import { logger } from "./default.logger";
import { Spinner } from "cli-spinner";
import { environment } from "../configs/environment";

//Mongo declarations
const MONGO_OPTIONS = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  keepAlive: true,
  authSource: "admin",
  useCreateIndex: true,
};

const MONGO_HOST = `${environment.mongoHost}/${environment.mongodbName}`;
const MONGO_USERNAME = environment.mongoUsername;
const MONGO_PASSWORD = environment.mongoPassword;

const mongo = {
  host: MONGO_HOST,
  username: MONGO_USERNAME,
  password: MONGO_PASSWORD,
  options: MONGO_OPTIONS,
  url: `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}`,
};
const connectMongo = () => {
  // decorations
  const spinner = new Spinner("Connecting to Mongodb... %s");
  spinner.setSpinnerString("|/-\\");
  spinner.start();
  mongoose
    .connect(mongo.url, mongo.options)
    .then(() => {
      spinner.stop(false);
      logger.info("🟢 Mongodb Connection Opened ");
    })
    .catch((err) => {
      spinner.stop(false);
      logger.error("🔴 Mongodb Connection failed");
      logger.info(mongo);
      logger.error(err);
    });
};
const disconnectMongo = async () => {
  await mongoose.connection.close();
};

export { connectMongo, disconnectMongo };
