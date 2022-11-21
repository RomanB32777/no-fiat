import { getTimePeriodQuery } from "./dateMethods/index";
import {
  addNotification,
  addAuthNotification,
  addAuthWalletNotification,
  addErrorNotification,
  addNotValidForm,
  addSuccessNotification,
  addInvalidAddress,
  addInstallWalletNotification,
} from "./notifications";

import {
  getRandomStr,
  shortStr,
  copyStr,
  fromHexToString,
} from "./stringMethods";

import {
  DateTimezoneFormatter,
  DateFormatter,
  DateSorter,
} from "./dateMethods";
import { makeStorageClient, uploadToIpfs, getFromIpfs } from "./ipfs";
import { tronlinkMethods, nearMethods, getUsdKoef } from "./wallets";

const isValidateFilled = (valuesArray: any[]) =>
  valuesArray.every((val) => Boolean(val));

export {
  // notifications
  addNotification,
  addAuthNotification,
  addAuthWalletNotification,
  addErrorNotification,
  addNotValidForm,
  addSuccessNotification,
  addInvalidAddress,
  addInstallWalletNotification,

  // strings
  getRandomStr,
  shortStr,
  copyStr,
  fromHexToString,

  // dates
  DateTimezoneFormatter,
  DateFormatter,
  DateSorter,
  getTimePeriodQuery,

  // currencies
  getUsdKoef,

  // ipfs
  makeStorageClient,
  uploadToIpfs,
  getFromIpfs,

  // data
  isValidateFilled,

  // wallets
  tronlinkMethods,
  nearMethods,
};
