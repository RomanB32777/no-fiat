import { ITipsObj, IWalletMethods } from "../../../types";
import {
  addErrorNotification,
  addSuccessNotification,
} from "../../notifications";

// tips
export const sendNearTips = async (
  { ownerAddress, employeeAddress, review, amount }: ITipsObj,
  methods: IWalletMethods
) => {
  try {
    const contractData = await methods.getBlockchainContractData();

    const tipsInfo = await contractData.send_tips(
      {
        owner_address: ownerAddress,
        tip_receiver_address: employeeAddress,
        review: +review,
      },
      "300000000000000",
      methods.formatBignumber(amount)
    );
    console.log(tipsInfo);

    return true; //tipsInfo;
  } catch (error) {
    addErrorNotification({
      title: (error as Error).message || "Processing error. Try again!",
    });
    return false;
  }
};

export const withdrawNearTeams = async (methods: IWalletMethods) => {
  try {
    const contractData = await methods.getBlockchainContractData();
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
};

export const withdrawNearTipsByEmployee = async (methods: IWalletMethods) => {
  try {
    const contractData = await methods.getBlockchainContractData();
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
};
