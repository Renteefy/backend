import { Request, Response } from "express";
import { Transaction } from "../../model/transaction.model";
import {
  getAllTransaction_service,
  getTransaction_service,
} from "./transaction.service";

async function getTransaction(req: Request, res: Response) {
  const { transactionID } = req.body;
  const transaction: Transaction | null = await getTransaction_service(
    transactionID
  );

  res.status(200).send({ ...transaction, id: undefined });
}
async function getAllTransaction(req: Request, res: Response) {
  const { userID } = res.locals.jwtPayload;
  const transactions = await getAllTransaction_service(userID);
  res.status(200).send({ transactions });
}

export { getTransaction, getAllTransaction };
