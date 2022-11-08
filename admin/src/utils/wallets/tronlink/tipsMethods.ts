import { ITipsObj, IWalletMethods } from "../../../types";

// tips
export const sendTronTips = async (
  { ownerAddress, employeeAddress, review, amount }: ITipsObj,
  methods: IWalletMethods
) => {
  try {
    const contractData = await methods.getBlockchainContractData();
    const tipsInfo = await contractData
      .sendTips(ownerAddress, employeeAddress, +review)
      .send({
        feeLimit: 100_000_000,
        callValue: 1000000 * parseFloat(amount),
        shouldPollResponse: false,
      });
    return tipsInfo;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const withdrawTronTeams = async (methods: IWalletMethods) => {
  try {
    const contractData = await methods.getBlockchainContractData();
    const withdrawInfo = await contractData.withdrawTeams().send();
    return withdrawInfo;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const withdrawTronTipAmountByEmployee = async (methods: IWalletMethods) => {
  try {
    const contractData = await methods.getBlockchainContractData();
    const withdrawInfo = await contractData.withdrawTipAmountByEmployee().send();
    return withdrawInfo;
  } catch (error) {
    console.log(error);
    return false;
  }
};

