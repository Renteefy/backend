import { Model } from "sequelize";
export default interface IInterface extends Model {
	assetID: String;
	title: String;
	category: String;
	description: String;
	price: String;
	interval: String;
	owner: String;
	rentedBy: String;
	image_urls: { type: String };
	reviews: { type: String };
	isAvailable: { type: Boolean };
	stars: Number;
}
