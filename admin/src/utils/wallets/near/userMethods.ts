import { connect } from "near-api-js";
import { initEmployeeInTeam } from "../../../consts";
import { IWalletConf } from "../../../types";

export async function checkIfOwner(this: IWalletConf) {
  try {
    const userWalletData = await this.getWalletUserData();
    const contractData = await this.getBlockchainContractData();
    const isOwner = await contractData.check_if_owner({
      address_to_check: userWalletData.userAddress,
    });
    return isOwner;
  } catch (error) {
    console.log((error as Error).message);
    // addErrorNotification({
    //   title: (error as Error).message || "Processing error. Try again!",
    // });
    return false;
  }
}

export async function checkIfTipReciever(this: IWalletConf, address?: string) {
  try {
    const userAddress = address || (await this.getWalletUserData()).userAddress;
    const contractData = await this.getBlockchainContractData();
    const tipRecieverData = await contractData.check_if_tip_receiver({
      address_to_check: userAddress,
    });
    return tipRecieverData;
  } catch (error) {
    console.log((error as Error).message);
    // addErrorNotification({
    //   title: (error as Error).message || "Processing error. Try again!",
    // });
    return false;
  }
}

export async function checkIsTeamMember(this: IWalletConf, address?: string) {
  try {
    const userWalletData =
      address || (await this.getWalletUserData()).userAddress;
    const contractData = await this.getBlockchainContractData();
    const userData = await contractData.check_and_show_if_team_member({
      address_to_check: userWalletData,
    });
    if (userData) {
      const [isExist, owner, orgName, teamName, percentageToPay] = userData;

      return {
        isExist,
        owner,
        orgName,
        teamName,
        percentageToPay,
      };
    }
    return initEmployeeInTeam;
  } catch (error) {
    console.log((error as Error).message || error);
    return initEmployeeInTeam;
  }
}

export async function getBalance(this: IWalletConf) {
  try {
    if (this.connectionConfig) {
      const userWalletData = await this.getWalletUserData();
      const nearConnection = await connect(this.connectionConfig);
      if (userWalletData.userAddress) {
        const account = await nearConnection.account(
          userWalletData.userAddress
        );
        const balance = await account.getAccountBalance();
        return this.formatNumber(balance.available);
      }
    }
    return 0;
  } catch (error) {
    console.log((error as Error).message);
    // addErrorNotification({
    //   title: (error as Error).message || "Processing error. Try again!",
    // });
    return 0;
  }
}
