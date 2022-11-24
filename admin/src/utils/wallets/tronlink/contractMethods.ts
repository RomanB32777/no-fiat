import {
  IWalletInitData,
  IWalletConf,
  IFormatAddressStr,
} from "../../../types";
import {
  addAuthWalletNotification,
  addInstallWalletNotification,
} from "../../notifications";

export async function getWalletUserData(this: IWalletConf) {
  return new Promise<IWalletInitData>((resolve) => {
    const tronWeb = (window as any).tronWeb;
    setTimeout(async () => {
      if (tronWeb) {
        if (tronWeb.defaultAddress.base58)
          resolve({
            userAddress: tronWeb.defaultAddress.base58,
          });
        else {
          addAuthWalletNotification("link");
          const currBlock = await tronWeb.trx.getCurrentBlock();
          currBlock && currBlock.blockID
            ? resolve({
                userAddress: tronWeb.defaultAddress.base58,
              })
            : resolve({ userAddress: null });
        }
      } else {
        const address =
          (window as any).tronWeb && (await this.getWalletUserData());
        address?.userAddress
          ? resolve({ userAddress: address.userAddress })
          : addInstallWalletNotification(
              "Link",
              "https://chrome.google.com/webstore/detail/tronlink/ibnejdfjmmkpcnlpebklmnkoeoihofec"
            );
      }
      resolve({ userAddress: null });
    }, 500);
  });
}

export async function getBlockchainContractData(this: IWalletConf) {
  try {
    const contractData = await (window as any).tronWeb.contract(
      this?.abi,
      this.address
    );
    return contractData || null;
  } catch (error) {
    // addErrorNotification({
    //   title: (error as Error).message || "Processing error. Try again!",
    // });
    return null;
  }
}

export const isValidAddress = (address: string) =>
  (window as any).tronWeb.isAddress(address) as boolean;

export const formatNumber = (from: any) =>
  Number((window as any).tronWeb.fromSun(from));

export const formatBignumber = (from: any) =>
  Number((window as any).tronWeb.toBigNumber(from).toString(10));

export const formatAddressStr = ({ address, format }: IFormatAddressStr) =>
  (window as any).tronWeb.address[format](address);

// export async function fromHexToBase58 = (hexStr: string) =>
//   (window as any).tronWeb.address.fromHex(hexStr);

// export async function fromBase58ToHex = (baseStr: string) =>
//   (window as any).tronWeb.address.toHex(baseStr);
