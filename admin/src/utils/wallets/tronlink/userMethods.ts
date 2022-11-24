import { initEmployeeInTeam } from "../../../consts";
import { IWalletConf } from "../../../types";

export async function checkIfOwner(this: IWalletConf) {
  try {
    const userWalletData = await this.getWalletUserData();
    const contractData = await this.getBlockchainContractData();
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
}

export async function checkIfTipReciever(this: IWalletConf, address?: string) {
  try {
    const userAddress = address || (await this.getWalletUserData()).userAddress;
    const contractData = await this.getBlockchainContractData();
    const tipRecieverData = await contractData
      .checkIfTipReciever(userAddress)
      .call();
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
    const userData = await contractData.showIfTeamMember(userWalletData).call();
    if (userData) {
      const [isExist, owner, orgName, teamName, percentageToPay] = userData;

      return {
        isExist,
        owner,
        orgName,
        teamName,
        percentageToPay: this.formatBignumber(percentageToPay),
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
    const tronWeb = (window as any).tronWeb;
    const userWalletData = await this.getWalletUserData();
    const tronBalance = await tronWeb.trx.getBalance(
      userWalletData.userAddress
    );
    if (tronBalance) {
      const formatBalance = tronWeb.fromSun(tronBalance);
      return parseFloat(formatBalance);
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
