import {
  IBlockchain,
  IWalletState,
  IWalletInitData,
  ITipRecieverObj,
  ICreateOrganization,
  IBalanceObj,
  IChangePhotoObj,
  ITipsObj,
  IFormatAddressStr,
  IWalletMethods,
  IWalletAction,
  IWalletConf,
  IWalletsConf,
} from "./wallet";
import {
  IEmployeeBase,
  IEmployee,
  ITeam,
  teamFields,
  IOrganization,
  IEmployeeAction,
  IOrganizationAction,
  IForTipsOrganizationAction,
} from "./organization";
import { userRoles, IUser, IUserAction } from "./user";
import { periodItemsTypes } from "../utils/dateMethods/types";

interface IFileInfo {
  preview: string;
  file: FileList;
}

interface ILoadingAction {
  type: string;
  payload: boolean;
}

interface IAnyAction {
  type: string;
  payload: any;
}

interface IFiltersForm {
  time_period: periodItemsTypes;
  custom_time_period: string[]; // startDate, endDate
}

interface IFiltersDates {
  start: number;
  end: number;
}

export type {
  IFileInfo,
  IAnyAction,
  ILoadingAction,
  IFiltersForm,
  IFiltersDates,

  // user
  userRoles,
  IUser,
  IUserAction,

  // wallet
  IBlockchain,
  IWalletState,
  IWalletMethods,
  IWalletInitData,
  ITipRecieverObj,
  ICreateOrganization,
  IBalanceObj,
  IChangePhotoObj,
  ITipsObj,
  IFormatAddressStr,
  IWalletAction,
  IWalletConf,
  IWalletsConf,

  // organization
  IEmployeeBase,
  IEmployee,
  ITeam,
  teamFields,
  IOrganization,
  IEmployeeAction,
  IOrganizationAction,
  IForTipsOrganizationAction,
};
