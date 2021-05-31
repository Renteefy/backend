import dotenv from "dotenv";
dotenv.config();
interface env {
  PORT: number;
  MONGODB_URL: string;
  MONGODB_DATABASE_NAME: string;
  JWT_SECRET: string;
  JWT_EXPIRY: string;
  WALLET_LIMIT: number;
}
const environment: env = {
  PORT: Number(process.env.PORT) || 3000,
  MONGODB_URL: process.env.MONGODB_URL || "mongodb://localhost:27017",
  MONGODB_DATABASE_NAME: process.env.MONGODB_DATABASE_NAME || "renteefy_dev",
  JWT_SECRET: process.env.JWT_SECRET || "hehehehehehemainahibataunga",
  JWT_EXPIRY: process.env.JWT_EXPIRY || "24d",
  WALLET_LIMIT: Number(process.env.WALLET_LIMIT) || 0,
};

export default environment;
