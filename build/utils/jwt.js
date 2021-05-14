"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const environment_1 = require("../configs/environment");
const extractToken = (req) => {
    if (req.headers.authorization && req.headers.authorization.split(" ")[0] === "Bearer") {
        return req.headers.authorization.split(" ")[1];
    }
    return undefined;
};
const checkJWT = (req, res, next) => {
    const token = extractToken(req) || "";
    try {
        const jwtPayload = jsonwebtoken_1.default.verify(token, environment_1.environment.jwtSecret);
        res.locals.jwtPayload = jwtPayload;
    }
    catch (err) {
        return res.status(401).end("Invalid jwt");
    }
    return next();
};
const signJWT = (userID) => {
    const token = jsonwebtoken_1.default.sign({ userID }, environment_1.environment.jwtSecret, {
        expiresIn: environment_1.environment.jwtExpiry,
    });
    return token;
};
exports.default = { checkJWT, signJWT };
// const jwt = require("jsonwebtoken");
// let ramu = {};
// module.exports = (req, res, next) => {
//   try {
//     const token = req.headers.authorization;
//     const decoded = jwt.verify(token, "secret");
//     if (decoded["username"] in ramu) {
//       ramu[decoded["username"]] += 1;
//     } else {
//       ramu[decoded["username"]] = 1;
//     }
//     console.log(ramu);
//     req.userData = decoded;
//     next();
//   } catch (error) {
//     return res.status(401).json({
//       message: "Auth failed",
//     });
//   }
// };
