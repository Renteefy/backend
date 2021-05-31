import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import environment from "./environment";

const extractToken = (req: Request): string | undefined => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    return req.headers.authorization.split(" ")[1];
  }

  return undefined;
};
const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  const token: string | undefined = extractToken(req) || "";
  try {
    const jwtPayload = jwt.verify(token, environment.JWT_SECRET as string);
    res.locals.jwtPayload = jwtPayload;
  } catch (err) {
    return res.status(401).end("Invalid jwt");
  }
  return next();
};
const signJWT = (userID: string) => {
  const token = jwt.sign({ userID }, environment.JWT_SECRET as string, {
    expiresIn: environment.JWT_EXPIRY,
  });
  return token;
};

export { checkAuth, signJWT };
