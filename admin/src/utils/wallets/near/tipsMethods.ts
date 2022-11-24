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

    const tipsInfo = await contractData.send_tips(
      {
        owner_address: ownerAddress,
        tip_receiver_address: employeeAddress,
        review: +review,
      },
      "300000000000000",
      this.formatBignumber(amount)
    );
    console.log(tipsInfo);

    return true; //tipsInfo;
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
    const withdrawInfo = await contractData.withdraw_teams();
    addSuccessNotification({
      title: "Processed successfully!",
    });
    console.log(withdrawInfo);

    return true; //withdrawInfo;
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
    const withdrawInfo = await contractData.withdraw_tips_by_tip_receiver();
    addSuccessNotification({
      title: "Processed successfully!",
    });
    console.log(withdrawInfo);

    return true; //withdrawInfo;
  } catch (error) {
    addErrorNotification({
      title: (error as Error).message || "Processing error. Try again!",
    });
    return false;
  }
}
