import { NextFunction, Request, Response } from "express";
import { check, validationResult } from "express-validator";

// const rentAsset_validator = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   // need to have in post request: AssetID
//   check("assetID", "Missing required body parameters").notEmpty();
//   let err = validationResult(req.body);
//   console.log(err);
//   if (!err.isEmpty()) {
//     return res.send("something wrnt rong").end();
//   }
//   return next();
// };

// export { rentAsset_validator };