import { Document } from "mongoose";
export default interface IUser extends Document {
	userID: string;
	email: string;
	username: string;
	firstName: string;
	lastName: string;
	isRentee: Boolean;
	isRenter: Boolean;
	profilePict: string;
	renteeStars: Number;
	renterStars: Number;
	ownedAssets: [string];
	rentedAssets: [string];
	requestedAssets: [string];
	ownedServices: [string];
	rentedServices: [string];
	requestedServices: [string];
}
