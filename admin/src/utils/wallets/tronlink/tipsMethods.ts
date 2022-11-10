import { ITipsObj, IWalletMethods } from "../../../types";
import {
  addErrorNotification,
  addSuccessNotification,
} from "../../notifications";

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
    addErrorNotification({
      title: (error as Error).message || "Processing error. Try again!",
    });
    return false;
  }
};

export const withdrawTronTeams = async (methods: IWalletMethods) => {
  try {
    const contractData = await methods.getBlockchainContractData();
    const withdrawInfo = await contractData.withdrawTeams().send();
    addSuccessNotification({
      title: "Processed successfully!",
    });
    return withdrawInfo;
  } catch (error) {
    addErrorNotification({
      title: (error as Error).message || "Processing error. Try again!",
    });
    return false;
  }
};

export const withdrawTronTipsByEmployee = async (methods: IWalletMethods) => {
  try {
    const contractData = await methods.getBlockchainContractData();
    const withdrawInfo = await contractData.withdrawTipsByEmployee().send();
    addSuccessNotification({
      title: "Processed successfully!",
    });
    return withdrawInfo;
  } catch (error) {
    addErrorNotification({
      title: (error as Error).message || "Processing error. Try again!",
    });
    return false;
  }
};
