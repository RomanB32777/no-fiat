import * as nearAPI from "near-api-js";
import { initEmployeeInTeam } from "../../../consts";
import { contextValue } from "../../../contexts/Wallet";
import { IWalletMethods } from "../../../types";

const { connect } = nearAPI;

export const checkIsOwner = async (methods: IWalletMethods) => {
  try {
    const userWalletData = await methods.getWalletUserData();
    const contractData = await methods.getBlockchainContractData();
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
};

export const checkIsTipReciever = async (
  methods: IWalletMethods,
  address?: string
) => {
  try {
    const userAddress =
      address || (await methods.getWalletUserData()).userAddress;
    const contractData = await methods.getBlockchainContractData();
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
};

export const checkIsTeamMember = async ({
  address,
  methods,
}: {
  address?: string;
  methods: IWalletMethods;
}) => {
  try {
    const userWalletData =
      address || (await methods.getWalletUserData()).userAddress;
    const contractData = await methods.getBlockchainContractData();
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
};

export const getNearBalance = async (methods: IWalletMethods) => {
  try {
    const walletConf = contextValue.currentWalletConf;
    if (walletConf.connectionConfig) {
      const userWalletData = await methods.getWalletUserData();
      const nearConnection = await connect(walletConf.connectionConfig);
      if (userWalletData.userAddress) {
        const account = await nearConnection.account(
          userWalletData.userAddress
        );
        const balance = await account.getAccountBalance();
        return methods.formatNumber(balance.available);
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
};
