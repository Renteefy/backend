"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    userID: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
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
}, {
    timestamps: true,
});
exports.default = mongoose_1.model("Users", UserSchema);
