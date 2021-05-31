export interface IUser {
  userID: string;
  email: string;
  username: string;
  name: string;
  isRentee: Boolean;
  isRenter: Boolean;
  profilePict: string;
  renteeStars?: Number;
  renterStars?: Number;
  ownedAssets?: [string];
  rentedAssets?: [string];
  requestedAssets?: [string];
  ownedServices?: [string];
  rentedServices?: [string];
  requestedServices?: [string];
  wallet: number;
}
