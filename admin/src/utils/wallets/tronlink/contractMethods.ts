import { IBalanceObj, IWalletInitData, IWalletMethods } from "../../../types";
import {
  addAuthWalletNotification,
  addInstallWalletNotification,
} from "../../notifications";

import { currentBlockchainConf, currentWalletConf } from "../../../consts";

export const getTronUserWallet = (methods: IWalletMethods) =>
  new Promise<IWalletInitData>((resolve) => {
    const tronWeb = (window as any).tronWeb;

    // process.env.REACT_APP_BLOCKCHAIN - use later
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
    if (currentBlockchainConf) {
      const contractData = await (window as any).tronWeb.contract(
        currentWalletConf.abi,
        currentBlockchainConf.address
      );
      return contractData;
    } else return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getTronBalance = async ({
  walletData,
  setBalance,
}: IBalanceObj) => {
  const tronWeb = (window as any).tronWeb;
  const tronBalance = await tronWeb.trx.getBalance(walletData.address);
  if (tronBalance) {
    const formatTronBalance = tronWeb.fromSun(tronBalance);
    setBalance &&
      formatTronBalance &&
      setBalance(parseFloat(formatTronBalance));
    return parseFloat(formatTronBalance);
  }
  return 0;
};

export const formatNumber = (from: any) =>
  Number((window as any).tronWeb.fromSun(from));
