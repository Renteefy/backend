import { Document } from "mongoose";
export default interface IUser extends Document {
  userID: string;
  profilePict: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
}
