// getAllAssets;
// getAsset;
// getSome;
// addAsset;
// updateAsset;
// deleteAsset;

import { Request, Response } from "express";
import environment from "../../config/environment";
import {
  addTransaction_service,
  checkExistingTransaction_service,
} from "../transaction/transaction.service";
import { getUserWallet_service } from "../user/user.service";
import {
  addAsset_service,
  getAllAssets_service,
  getAsset_service,
} from "./asset.service";

// remove in prod
async function assetHealthcheck(req: Request, res: Response) {
  res.send("healthy");
}

const getAllAssets = async (req: Request, res: Response) => {
  const assets = await getAllAssets_service();
  res.status(200).json(assets);
};

const addAsset = async (req: Request, res: Response) => {
  const { insuranceAmt, title, category, description, price, interval } =
    req.body;
  const owner = res.locals.jwtPayload.userID;
  const newAsset = await addAsset_service({
    insurance_amt: insuranceAmt,
    title: title,
    category: category,
    description: description,
    price: price,
    owner: owner,
    interval: interval,
  });

  if (newAsset) return res.status(200).send({ messasge: "Success" });
  return res.status(500).send({ message: "Something went wrong" });
};

const rentAsset = async (req: Request, res: Response) => {
  const { assetID } = req.body;
  const { userID } = res.locals.jwtPayload;
  let renter = userID;
  try {
    const currentWalletAmt = await getUserWallet_service(renter);
    let asset = await getAsset_service(assetID);
    let owner = asset.owner;
    // check wallet amount if less than WALLET_LIMIT
    // return to user saying wallet is low pls recharge
    if (currentWalletAmt <= environment.WALLET_LIMIT)
      return res.status(200).send({
        message: "insufficient balance",
        status: "insufficient_balance",
      });

    // check if transaction already exists query with assetID renter and rentee
    // else make a transaction and store into the table
    if (await checkExistingTransaction_service(renter, owner, assetID)) {
      return res.status(200).send({
        message: "Request already raised",
        status: "request_already_raised",
      });
    }

    // store in transaction table
    addTransaction_service(renter, owner, assetID);
    return res.status(200).send({
      message: "Request Raised",
      status: "request_raised",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Something went wrong" });
  }
};

export { getAllAssets, addAsset, rentAsset, assetHealthcheck };
