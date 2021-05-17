const { Sequelize, Model, DataTypes } = require("sequelize");
import { sequelize } from "../../utils/mysqlConnection";
class Assets extends Model {}
Assets.init(
	{
		assetID: { type: DataTypes.STRING, primaryKey: true, unique: true },
		title: DataTypes.STRING,
		category: DataTypes.STRING,
		description: DataTypes.STRING,
		price: DataTypes.STRING,
		interval: DataTypes.STRING,
		owner: DataTypes.STRING,
		rentedBy: DataTypes.STRING,
		image_urls: DataTypes.JSON,
		reviews: DataTypes.JSON,
		isAvailable: { type: DataTypes.BOOLEAN, defaultValue: true },
		stars: { type: DataTypes.INTEGER, defaultValue: -1 },
	},
	{ sequelize, modelName: "assets" }
);

// (async () => {
// 	await sequelize.sync();
// 	const mac = await Assets.create({
// 		title: "Macbook",
// 		category: "Tech",
// 		description: "One fasty fast boi laptop",
// 		price: "69",
// 		interval: "per day",
// 		owner: "your mom",
// 		rentedBy: "dhinka chika",
// 	});
// 	console.log(mac.toJSON());
// })();

export default Assets;
