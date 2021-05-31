"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signJWT = exports.checkAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const environment_1 = __importDefault(require("./environment"));
const extractToken = (req) => {
    if (req.headers.authorization &&
        req.headers.authorization.split(" ")[0] === "Bearer") {
        return req.headers.authorization.split(" ")[1];
    }
    return undefined;
};
const checkAuth = (req, res, next) => {
    const token = extractToken(req) || "";
    try {
        const jwtPayload = jsonwebtoken_1.default.verify(token, environment_1.default.JWT_SECRET);
        res.locals.jwtPayload = jwtPayload;
    }
    catch (err) {
        return res.status(401).end("Invalid jwt");
    }
    return next();
};
exports.checkAuth = checkAuth;
const signJWT = (userID) => {
    const token = jsonwebtoken_1.default.sign({ userID }, environment_1.default.JWT_SECRET, {
        expiresIn: environment_1.default.JWT_EXPIRY,
    });
    return token;
};
exports.signJWT = signJWT;
