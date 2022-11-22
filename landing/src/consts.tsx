import TronlinkBig from "./assets/trx_big.png";
import NearBig from "./assets/near_big.png";
import { isInstallTronWallet } from "./utils";

export interface IWallet {
  [walletName: string]: {
    img: string;
    isInstallMethod: () => boolean;
    installLink: string;
    name: string;
    appLink: string;
  };
}

export const wallets: IWallet = {
  tron: {
    img: TronlinkBig,
    isInstallMethod: () => isInstallTronWallet(),
    installLink:
      "https://chrome.google.com/webstore/detail/tronlink/ibnejdfjmmkpcnlpebklmnkoeoihofec",
    name: "Tron Shasta Testnet",
    appLink: "https://tron.nofiat.app/register",
  },
  near: {
    img: NearBig,
    isInstallMethod: () => true,
    installLink: "https://wallet.testnet.near.org/",
    name: "Near Testnet",
    appLink: "https://near.nofiat.app/",
  },
};

export const url = "/images/";
