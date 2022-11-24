import { createContext } from "react";
import { blockchainsType, IWalletContext, IWalletsConf } from "../types";
import { initValue, nearConf, tronConf } from "./values";

const walletsConf: IWalletsConf = {
  tronlink: tronConf,
  near: nearConf,
};

const currentWalletName = process.env.REACT_APP_WALLET || "tronlink";
const currentWalletConf = walletsConf[currentWalletName];

export const contextValue: IWalletContext = {
  walletsConf,
  currentWalletConf,
  currentWalletName: currentWalletName as blockchainsType,
};

export const WalletContext = createContext<IWalletContext>(initValue);

export const WalletProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <WalletContext.Provider value={contextValue}>
      {children}
    </WalletContext.Provider>
  );
};
