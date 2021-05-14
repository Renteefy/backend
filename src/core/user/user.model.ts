import { Schema, model } from "mongoose";
import IUser from "./user.interface";

const UserSchema: Schema = new Schema(
	{
		userID: { type: String, required: true, unique: true }, // will stay the same
		email: String,
		username: { type: String, required: true, unique: true }, //can change
		firstName: String,
		lastName: String,
		isRentee: { type: Boolean, default: false },
		isRenter: { type: Boolean, default: false },
		profilePict: String,
		renteeStars: { type: Number, default: 5 },
		renterStars: { type: Number, default: 5 },
		ownedAssets: [{ type: String }],
		rentedAssets: [{ type: String }],
		requestedAssets: [{ type: String }],
		ownedServices: [{ type: String }],
		rentedServices: [{ type: String }],
		requestedServices: [{ type: String }],
	},
	{
		timestamps: true,
	}
);

export default model<IUser>("Users", UserSchema);
