// import {
//   isInstallMetamaskWallet,
//   isInstallTronWallet,
// } from "./functions/getWalletData";

import TronlinkBig from "./assets/tronlink_big.png";
import TrxBig from "./assets/trx_big.png";

interface IWallet {
  [walletName: string]: {
    img: string;
    isInstallMethod: () => boolean;
    installLink: string;
    blockchains: {
      name: string;
      appLink: string;
      img: string;
    }[];
  };
}

export const wallets: IWallet = {
  tronlink: {
    img: TronlinkBig,
    isInstallMethod: () => true,
    installLink:
      "https://chrome.google.com/webstore/detail/tronlink/ibnejdfjmmkpcnlpebklmnkoeoihofec",
    blockchains: [
      {
        name: "Tron Nile Testnet",
        appLink: "https://tron.cryptodonutz.xyz/",
        img: TrxBig,
      },
    ],
  },
};

export const url = "/images/";
