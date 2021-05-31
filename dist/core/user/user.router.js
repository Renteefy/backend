"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jwt_1 = require("../../config/jwt");
const router = express_1.default.Router();
const user_controller_1 = require("./user.controller");
router.get("/healthcheck", user_controller_1.healthCheck);
router.get("/jwtprotect", jwt_1.checkAuth, (req, res) => {
    res.send("yay! its working!");
});
router.post("/login", user_controller_1.login);
router.post("/signup", user_controller_1.signup);
exports.default = router;
