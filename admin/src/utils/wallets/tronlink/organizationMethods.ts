import { initOrganization } from "../../../consts";
import { ICreateOrganization, IWalletMethods } from "../../../types";

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
    return organization;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const showTronOrganization = async (
  methods: IWalletMethods,
  ownerAddress?: string
) => {
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

      return {
        organizationAddress,
        initialized,
        teamsPart,
        organizationName,
        teamsAmountToWithdraw: methods.formatNumber(teamsAmountToWithdraw),
        teams,
        allTipReceivers,
      };
    }
    return initOrganization;
  } catch (error) {
    console.log(error);
    return initOrganization;
  }
};
