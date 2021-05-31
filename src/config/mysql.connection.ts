import { createConnection } from "typeorm";

const connectMysql = async () => {
  try {
    await createConnection();
    console.log("connected to mysql");
    return true;
  } catch (error) {
    console.log("could not connected to mysql", error);
    return false;
  }
};

export { connectMysql };
