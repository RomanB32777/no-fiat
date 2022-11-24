import { ITipsObj, IWalletConf } from "../../../types";
import {
  addErrorNotification,
  addSuccessNotification,
} from "../../notifications";

// tips
export async function sendTips(
  this: IWalletConf,
  { ownerAddress, employeeAddress, review, amount }: ITipsObj
) {
  try {
    const contractData = await this.getBlockchainContractData();
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
}

export async function withdrawTeams(this: IWalletConf) {
  try {
    const contractData = await this.getBlockchainContractData();
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
}

export async function withdrawTipsByEmployee(this: IWalletConf) {
  try {
    const contractData = await this.getBlockchainContractData();
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
}
