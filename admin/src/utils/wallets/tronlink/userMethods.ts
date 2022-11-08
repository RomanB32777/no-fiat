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
    console.log(error);
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
    console.log(error);
    return false;
  }
};
