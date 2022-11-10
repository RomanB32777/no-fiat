import { initOrganization } from "../../../consts";
import {
  ICreateOrganization,
  IOrganization,
  ITeam,
  IWalletMethods,
} from "../../../types";
import {
  addErrorNotification,
  addSuccessNotification,
} from "../../notifications";

// organization
export const addTronOrganization = async (
  objForCreateOrganization: ICreateOrganization,
  methods: IWalletMethods
) => {
  try {
    const { percentages, name } = objForCreateOrganization;
    const contractData = await methods.getBlockchainContractData();
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
};

export const showTronOrganization = async (
  methods: IWalletMethods,
  ownerAddress?: string
): Promise<IOrganization> => {
  try {
    const userAddress =
      ownerAddress || (await methods.getWalletUserData()).userAddress;
    const contractData = await methods.getBlockchainContractData();
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
            methods.formatAddressStr({
              address,
              format: "fromHex",
            })
          ),
          percentageToPay,
        })
      );

      return {
        organizationAddress: methods.formatAddressStr({
          address: organizationAddress,
          format: "fromHex",
        }),
        initialized,
        teamsPart,
        organizationName,
        teamsAmountToWithdraw: methods.formatNumber(teamsAmountToWithdraw),
        teams: formatTeams,
        allTipReceivers: allTipReceivers.map((e: string) =>
          methods.formatAddressStr({ address: e, format: "fromHex" })
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
};
