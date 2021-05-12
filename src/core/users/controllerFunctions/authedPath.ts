import { Request, Response } from "express";
const authedPath = async (req: Request, res: Response) => {
  res.send("authed accessed");
};
export default authedPath;
