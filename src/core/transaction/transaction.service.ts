import { nanoid } from "nanoid";
import { getRepository } from "typeorm";
import { Transaction } from "../../model/transaction.model";
import { getUsername_service } from "../user/user.service";

async function addTransaction_service(
  renter: string,
  owner: string,
  assetID: string
) {
  try {
    const newTransaction = new Transaction();
    newTransaction.renter = renter;
    newTransaction.owner = owner;
    newTransaction.status = "REQUEST_RAISED";
    newTransaction.tranID = "transaction-" + nanoid();
    newTransaction.assetID = assetID;
    newTransaction.save();
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
async function getTransaction_service(
  transactionID: string
): Promise<Transaction | null> {
  return (await Transaction.findOne({ tranID: transactionID })) || null;
}
async function getAllTransaction_service(userID: string) {
  const transactions = getRepository(Transaction).find({
    where: [{ renter: userID }, { owner: userID }],
  });
  let stagingUsernamePromise = (await transactions).map(async (transaction) => {
    transaction.renter = await getUsername_service(transaction.renter);
    transaction.owner = await getUsername_service(transaction.owner);
    return transaction;
  });
  //console.log(stagingUsernamePromise);
  return Promise.all(stagingUsernamePromise);
}

async function checkExistingTransaction_service(
  owner: string,
  renter: string,
  assetID: string
) {
  const transaction = await Transaction.findOne({
    renter,
    owner,
    assetID,
  });
  if (transaction === undefined) {
    return false;
  }
  return true;
}
export {
  getTransaction_service,
  addTransaction_service,
  checkExistingTransaction_service,
  getAllTransaction_service,
};
