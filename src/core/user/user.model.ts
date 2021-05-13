import { Schema, model } from "mongoose";
import IUser from "./user.interface";

const UserSchema: Schema = new Schema(
  {
    userID: { type: String, required: true, unique: true }, // will stay the same
    profilePict: String,
    firstName: String,
    lastName: String,
    username: { type: String, required: true, unique: true }, //can change
    email: String,
  },
  {
    timestamps: true,
  }
);

export default model<IUser>("Users", UserSchema);
