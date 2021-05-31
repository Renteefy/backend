import { MongoClient } from "mongodb";
import environment from "./environment";
const uri = environment.MONGODB_URL;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connectMongo = async () => {
  try {
    await client.connect();
    console.log("connected to mongo");
    return true;
  } catch (error) {
    return false;
  }
};

const getMongoClient = () => {
  return client.db(environment.MONGODB_DATABASE_NAME);
};

export { connectMongo, getMongoClient };
