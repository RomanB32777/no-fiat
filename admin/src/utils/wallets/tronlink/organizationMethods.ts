import { initOrganization } from "../../../consts";
import {
  ICreateOrganization,
  IOrganization,
  ITeam,
  IWalletConf,
} from "../../../types";
import {
  addErrorNotification,
  addSuccessNotification,
} from "../../notifications";

// organization
export async function addOrganization(
  this: IWalletConf,
  objForCreateOrganization: ICreateOrganization
) {
  try {
    const { percentages, name } = objForCreateOrganization;
    const contractData = await this.getBlockchainContractData();
    const organization = await contractData
      .addOrganization(percentages, name)
      .send();
    addSuccessNotification({
      title: "Processed successfully!",
    });
    return organization;
  } catch (error) {
    addErrorNotification({
      title: (error as Error).message || "Processing error. Try again!",
    });
    return null;
  }
}

export async function showOrganization(
  this: IWalletConf,
  ownerAddress?: string
): Promise<IOrganization> {
  try {
    const userAddress =
      ownerAddress || (await this.getWalletUserData()).userAddress;
    const contractData = await this.getBlockchainContractData();
    const organizationInfo = await contractData
      .showOrganization(userAddress)
      .call();
    if (organizationInfo) {
      const [
        organizationAddress,
        initialized,
        teamsPart,
        organizationName,
        teamsAmountToWithdraw,
        teams,
        allTipReceivers,
      ] = organizationInfo;

      const formatTeams: ITeam[] = teams.map(
        ({ name, employeesInTeam, percentageToPay }: ITeam) => ({
          name,
          employeesInTeam: employeesInTeam.map((address) =>
            this.formatAddressStr({
              address,
              format: "fromHex",
            })
          ),
          percentageToPay,
        })
      );

      return {
        organizationAddress: this.formatAddressStr({
          address: organizationAddress,
          format: "fromHex",
        }),
        initialized,
        teamsPart,
        organizationName,
        teamsAmountToWithdraw: this.formatNumber(teamsAmountToWithdraw),
        teams: formatTeams,
        allTipReceivers: allTipReceivers.map((e: string) =>
          this.formatAddressStr({ address: e, format: "fromHex" })
        ),
      };
    }
    return initOrganization;
  } catch (error) {
    console.log((error as Error).message);
    // addErrorNotification({
    //   title: (error as Error).message || "Processing error. Try again!",
    // });
    return initOrganization;
  }
}
