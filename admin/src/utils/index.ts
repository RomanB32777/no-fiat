import { getTimePeriodQuery } from "./dateMethods/index";
import {
  addNotification,
  addAuthNotification,
  addAuthWalletNotification,
  addErrorNotification,
  addSuccessNotification,
  addNotFoundUserNotification,
  addInstallWalletNotification,
} from "./notifications";

import { getRandomStr, shortStr, copyStr } from "./stringMethods";

import {
  DateTimezoneFormatter,
  DateFormatter,
  DateSorter,
} from "./dateMethods";
import { tronlinkMethods, getUsdKoef, makeStorageClient } from "./wallets";

const isValidateFilled = (valuesArray: any[]) =>
  valuesArray.every((val) => Boolean(val));

export {
  // notifications
  addNotification,
  addAuthNotification,
  addAuthWalletNotification,
  addErrorNotification,
  addSuccessNotification,
  addNotFoundUserNotification,
  addInstallWalletNotification,

  // strings
  getRandomStr,
  shortStr,
  copyStr,

  // dates
  DateTimezoneFormatter,
  DateFormatter,
  DateSorter,
  getTimePeriodQuery,

  // wallets
  tronlinkMethods,
  makeStorageClient,

  // currencies
  getUsdKoef,

  // data
  isValidateFilled,
};
