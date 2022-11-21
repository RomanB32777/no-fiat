import { contextValue } from "../../../contexts/Wallet";
import {
  IWalletInitData,
  IWalletMethods,
  IFormatAddressStr,
} from "../../../types";
import {
  addAuthWalletNotification,
  addInstallWalletNotification,
} from "../../notifications";
import { initialTronlinkState } from "../../../consts";

export const getTronUserWallet = (methods: IWalletMethods) =>
  new Promise<IWalletInitData>((resolve) => {
    const tronWeb = (window as any).tronWeb;

    setTimeout(async () => {
      if (tronWeb) {
        if (tronWeb.defaultAddress.base58)
          resolve({
            userAddress: tronWeb.defaultAddress.base58,
          });
        else {
          addAuthWalletNotification("Tronlink");
          const currBlock = await tronWeb.trx.getCurrentBlock();
          currBlock && currBlock.blockID
            ? resolve({
                userAddress: tronWeb.defaultAddress.base58,
              })
            : resolve({ userAddress: null });
        }
      } else {
        const address =
          (window as any).tronWeb && (await methods.getWalletUserData());
        address?.userAddress
          ? resolve({ userAddress: address.userAddress })
          : addInstallWalletNotification(
              "TronLink",
              "https://chrome.google.com/webstore/detail/tronlink/ibnejdfjmmkpcnlpebklmnkoeoihofec"
            );
      }
      resolve({ userAddress: null });
    }, 500);
  });

export const getTronContractData = async () => {
  try {
    const currentBlockchainConf = contextValue.currentWalletConf; // { address: "" }; // !!!!!!!!!
    if (currentBlockchainConf) {
      const contractData = await (window as any).tronWeb.contract(
        initialTronlinkState.abi,
        currentBlockchainConf.address
      );
      return contractData;
    } else return null;
  } catch (error) {
    // addErrorNotification({
    //   title: (error as Error).message || "Processing error. Try again!",
    // });
    return null;
  }
};

export const isValidTronAddress = (address: string) =>
  (window as any).tronWeb.isAddress(address) as boolean;

export const formatNumber = (from: any) =>
  Number((window as any).tronWeb.fromSun(from));

export const formatBignumber = (from: any) =>
  Number((window as any).tronWeb.toBigNumber(from).toString(10));

export const formatTronAddressStr = ({ address, format }: IFormatAddressStr) =>
  (window as any).tronWeb.address[format](address);

// export const fromHexToBase58 = (hexStr: string) =>
//   (window as any).tronWeb.address.fromHex(hexStr);

// export const fromBase58ToHex = (baseStr: string) =>
//   (window as any).tronWeb.address.toHex(baseStr);
