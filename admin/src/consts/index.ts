import {
  currencyBlockchainsType,
  IBlockchain,
  IEmployee,
  IEmployeeBase,
  IEmployeeInTeam,
  IOrganization,
} from "../types";
import { initialTronlinkState } from "./tronlink";
import { initialNearState } from "./near";

const isProduction =
  process.env.REACT_APP_NODE_ENV &&
  process.env.REACT_APP_NODE_ENV === "production";

const baseURL = `${isProduction ? "https" : "http"}://${
  window.location.hostname + (!isProduction ? ":3000" : "")
}`;

const initEmployeeBase: IEmployeeBase = {
  name: "",
  address: "",
  photoLink: "",
};

const initEmployee: IEmployee = {
  name: "",
  address: "",
  photoLink: "",
  orgOwner: "",
  tipSum: [],
  tipAmountToWithdraw: 0,
  reviews: [],
  dates: [],
};

const initEmployeeInTeam: IEmployeeInTeam = {
  isExist: false,
  owner: "",
  orgName: "",
  teamName: "",
  percentageToPay: 0,
};

const initOrganization: IOrganization = {
  initialized: false,
  teamsPart: 0,
  organizationName: "",
  teamsAmountToWithdraw: 0,
  teams: [],
  allTipReceivers: [],
};

const initBlockchain: IBlockchain = {
  address: "",
  name: "",
  icon: "",
  chainName: "",
  nativeCurrency: {
    symbol: "",
    name: "",
  },
};

const currencyBlockchains: currencyBlockchainsType = {
  tronlink: "tron",
  near: "near",
};

export {
  isProduction,
  baseURL,
  initBlockchain,
  initEmployeeBase,
  initEmployee,
  initEmployeeInTeam,
  initOrganization,
  initialTronlinkState,
  initialNearState,
  currencyBlockchains,
};
