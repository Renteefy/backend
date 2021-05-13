import { Request, Response } from "express";
import userModel from "./user.model";
import { listUsers } from "./user.service";
const getAllUsers = async (req: Request, res: Response) => {
  const users = await listUsers(userModel);
  res.send(users);
};
export { getAllUsers };
