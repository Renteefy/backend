import { getMongoClient } from "../../config/mongo.connection";
import { IUser } from "./user.interface";

async function getUserObjFromEmail_service(email: string) {
  try {
    const userCollection = getMongoClient().collection("users");
    const user: IUser | null = await userCollection.findOne({ email: email });
    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function addUser_service(newUser: IUser): Promise<boolean> {
  try {
    const userCollection = getMongoClient().collection("users");
    const user = await userCollection.insertOne(newUser);
    if (user) return true;
    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
}

// takes in a userID returns a username
async function getUsername_service(userID: string) {
  const userCollection = getMongoClient().collection("users");
  const user: IUser | null = await userCollection.findOne({ userID: userID });
  if (user) return user.username;
  return "";
}

async function getUserWallet_service(userID: string): Promise<number> {
  const userCollection = getMongoClient().collection("users");
  const user: IUser = await userCollection.findOne({ userID: userID });
  return user.wallet;
}

async function getUserInfo_service(userID: string) {
  try {
    const userInfo: IUser = await getMongoClient()
      .collection("user")
      .findOne({ userID: userID });
    return {
      email: userInfo.email,
      username: userInfo.username,
      name: userInfo.name,
      renterStars: userInfo.renterStars,
      renteeStars: userInfo.renteeStars,
      isRenter: userInfo.isRenter,
      isRentee: userInfo.isRentee,
    };
  } catch (error) {
    console.log(error);
    return {};
  }
}

export {
  getUserObjFromEmail_service,
  getUserWallet_service,
  addUser_service,
  getUserInfo_service,
  getUsername_service,
};
