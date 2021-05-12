import { Request, Response } from "express";
import { logger } from "../../../utils/default.logger";
import IUser from "../users.interface";
import { nanoid } from "nanoid";

import User from "../users.model";
import JWT from "../../../utils/jwt";

const storeLoginDetails = async (req: Request, res: Response) => {
  try {
    const checkUser = await User.findOne({ username: req.body.username });

    if (checkUser === null) {
      const userID = nanoid();
      const token = JWT.signJWT(userID);
      const user: IUser = await User.create({
        userID: userID,
        profilePict: req.body.picture,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        email: req.body.email,
      });
      return res
        .status(200)
        .json({ message: "Stored", user: user, token: token });
    } else {
      return res.status(200).json({
        message: "Already a User",
        user: checkUser,
        token: JWT.signJWT(checkUser.userID),
      });
    }
  } catch (err) {
    logger.error(err);
    return res.status(500).json({ message: err.message, error: err });
  }
};
export default storeLoginDetails;
