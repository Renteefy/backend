import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { environment } from "../configs/environment";

const extractToken = (req: Request): string | undefined => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    return req.headers.authorization.split(" ")[1];
  }

  return undefined;
};
const checkJWT = (req: Request, res: Response, next: NextFunction) => {
  const token: string | undefined = extractToken(req) || "";
  try {
    const jwtPayload = jwt.verify(token, environment.jwtSecret);
    res.locals.jwtPayload = jwtPayload;
  } catch (err) {
    return res.status(401).end("Invalid jwt");
  }
  return next();
};
const signJWT = (userID: string) => {
  const token = jwt.sign({ userID }, environment.jwtSecret, {
    expiresIn: environment.jwtExpiry,
  });
  return token;
};

export default { checkJWT, signJWT };

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
