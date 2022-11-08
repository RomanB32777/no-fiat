import { IWalletsConf } from "../types";
import { tronlinkMethods } from "../utils";
import { initEmployee, initOrganization, initialTronlinkState } from "./tronlink";

const isProduction =
  process.env.REACT_APP_NODE_ENV &&
  process.env.REACT_APP_NODE_ENV === "production";

const baseURL = `${isProduction ? "https" : "http"}://${
  window.location.hostname + (!isProduction ? ":3000" : "")
}`;

const walletsConf: IWalletsConf = {
  tronlink: { ...initialTronlinkState, ...tronlinkMethods },
};

const currentWalletName = process.env.REACT_APP_WALLET || "tronlink";
const currentBlockchainName = process.env.REACT_APP_BLOCKCHAIN || "tron";

const currentWalletConf = walletsConf[currentWalletName];

const currentBlockchainConf = walletsConf[currentWalletName].blockchains.find(
  (b) => b.name === currentBlockchainName
);

export {
  isProduction,
  baseURL,
  initEmployee,
  initOrganization,
  walletsConf,
  currentWalletName,
  currentBlockchainName,
  currentWalletConf,
  currentBlockchainConf,
};
