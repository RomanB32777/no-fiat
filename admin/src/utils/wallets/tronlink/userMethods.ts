import { IWalletMethods } from "../../../types";

export const checkIsOwner = async (methods: IWalletMethods) => {
  try {
    const userWalletData = await methods.getWalletUserData();
    const contractData = await methods.getBlockchainContractData();
    const isOwner = await contractData
      .checkIfOwner(userWalletData.userAddress)
      .call();
    return isOwner;
  } catch (error) {
    console.log((error as Error).message);
    // addErrorNotification({
    //   title: (error as Error).message || "Processing error. Try again!",
    // });
    return false;
  }
};

export const checkIsTipReciever = async (methods: IWalletMethods) => {
  try {
    const userWalletData = await methods.getWalletUserData();
    const contractData = await methods.getBlockchainContractData();
    const tipRecieverData = await contractData
      .checkIfTipReciever(userWalletData.userAddress)
      .call();
    return tipRecieverData;
  } catch (error) {
    console.log((error as Error).message);
    // addErrorNotification({
    //   title: (error as Error).message || "Processing error. Try again!",
    // });
    return false;
  }
};

export const getTronBalance = async (methods: IWalletMethods) => {
  try {
    const tronWeb = (window as any).tronWeb;
    const userWalletData = await methods.getWalletUserData();
    const tronBalance = await tronWeb.trx.getBalance(
      userWalletData.userAddress
    );
    if (tronBalance) {
      const formatTronBalance = tronWeb.fromSun(tronBalance);
      return parseFloat(formatTronBalance);
    }
    return 0;
  } catch (error) {
    console.log((error as Error).message);
    // addErrorNotification({
    //   title: (error as Error).message || "Processing error. Try again!",
    // });
    return 0;
  }
};
