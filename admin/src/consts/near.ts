import { keyStores } from "near-api-js";
import { IWalletState } from "../types";
import nearIcon from "../assets/nearIcon.png";

const myKeyStore = new keyStores.BrowserLocalStorageKeyStore();
const CONTRACT_NAME = process.env.REACT_APP_NEAR_CONTRACT_NAME || "";

export const initialNearState: IWalletState = {
  address: CONTRACT_NAME,
  chainName: process.env.REACT_APP_NEAR_CHAIN_NAME || "",
  icon: nearIcon,
  nativeCurrency: {
    name: "near",
    symbol: "NEAR",
  },
  connectionConfig: {
    networkId: "testnet",
    keyStore: myKeyStore, // first create a key store
    nodeUrl: "https://rpc.testnet.near.org",
    walletUrl: "https://wallet.testnet.near.org",
    helperUrl: "https://helper.testnet.near.org",
    explorerUrl: "https://explorer.testnet.near.org",
  },
};
