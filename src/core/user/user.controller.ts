import { Request, Response } from "express";
import { nanoid } from "nanoid";
import { signJWT } from "../../config/jwt";
import { IUser } from "./user.interface";
import { addUser_service, getUserObjFromEmail_service } from "./user.service";

const healthCheck = (req: Request, res: Response) => {
  res.send("healthy");
};

const login = async (req: Request, res: Response) => {
  const { email } = req.body;
  let user = await getUserObjFromEmail_service(email);
  if (user === null)
    return res
      .status(401)
      .send({ status: "no_user_found", message: "No user found" });
  return res
    .status(200)
    .send({ username: user.username, token: signJWT(user.userID) });
};

const signup = async (req: Request, res: Response) => {
  const { email, pfp, name, username } = req.body;
  let user = await getUserObjFromEmail_service(email);
  if (user !== null)
    return res.status(200).send({
      status: "user_exists",
      message: "user exists, Login instead",
    });
  const newUser: IUser = {
    email: email,
    name: name,
    profilePict: pfp,
    isRentee: false,
    isRenter: false,
    username: username,
    wallet: 0,
    userID: "user-" + nanoid(),
  };
  if (await addUser_service(newUser))
    return res.status(200).send({
      message: "Success",
      token: signJWT(newUser.userID),
    });
  return res.status(500).send({ message: "something went wrong" });
};

export { healthCheck, login, signup };
