import { initOrganization } from "../../../consts";
import {
  ICreateOrganization,
  IOrganization,
  IWalletMethods,
} from "../../../types";
import {
  addErrorNotification,
  addSuccessNotification,
} from "../../notifications";

// organization
export const addNearOrganization = async (
  objForCreateOrganization: ICreateOrganization,
  methods: IWalletMethods
) => {
  try {
    const { percentages, name } = objForCreateOrganization;
    const contractData = await methods.getBlockchainContractData();
    const organization = await contractData.add_organization({
      percentages,
      name,
    });
    console.log("organization", organization);

    addSuccessNotification({
      title: "Processed successfully!",
    });
    return true; //organization;
  } catch (error) {
    addErrorNotification({
      title: (error as Error).message || "Processing error. Try again!",
    });
    return null;
  }
};

export const showNearOrganization = async (
  methods: IWalletMethods,
  ownerAddress?: string
): Promise<IOrganization> => {
  try {
    const userAddress =
      ownerAddress || (await methods.getWalletUserData()).userAddress;
    const contractData = await methods.getBlockchainContractData();
    const organizationInfo = await contractData.show_organization({
      org_owner: userAddress,
    });

    if (organizationInfo) {
      const {
        initialized,
        teams_part,
        organization_name,
        teams_amount_to_withdraw,
        teams,
        all_tip_receivers,
      } = organizationInfo;

      return {
        initialized,
        teamsPart: teams_part,
        organizationName: organization_name,
        teamsAmountToWithdraw: methods.formatNumber(
          teams_amount_to_withdraw.toLocaleString('fullwide', {useGrouping:false})
        ),
        teams: teams.map((t: any) => ({
          ...t,
          employeesInTeam: t.employees_in_team,
          percentageToPay: t.percentage_to_pay,
        })),
        allTipReceivers: all_tip_receivers,
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
