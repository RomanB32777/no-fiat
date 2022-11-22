import { Buffer } from "buffer";
import * as nearAPI from "near-api-js";
import { contextValue } from "../../../contexts/Wallet";
import {
  IWalletInitData,
  IWalletMethods,
  IFormatAddressStr,
} from "../../../types";

// @ts-ignore
window.Buffer = Buffer;

const { connect, utils, WalletConnection, Contract } = nearAPI;

export const getNearUserWallet = async (
  methods: IWalletMethods
): Promise<IWalletInitData> => {
  try {
    const walletConf = contextValue.currentWalletConf;
    if (walletConf.connectionConfig) {
      const nearConnection = await connect(walletConf.connectionConfig);
      const walletConnection = new WalletConnection(nearConnection, null);

      if (walletConnection.isSignedIn()) {
        const walletAccountId = walletConnection.getAccountId();
        return { userAddress: walletAccountId };
      } else {
        console.log("not signed");
        await walletConnection.requestSignIn({
          contractId: walletConf.address,
          // successUrl: "",
          // failureUrl: "",
        });
      }
    }
    return { userAddress: "" };
  } catch (error) {
    console.log(error);
    return { userAddress: "" };
  }
};

export const getNearContractData = async (methods: IWalletMethods) => {
  try {
    const walletConf = contextValue.currentWalletConf;
    if (walletConf.connectionConfig) {
      const nearConnection = await connect(walletConf.connectionConfig);
      const walletConnection = new WalletConnection(nearConnection, null);
      const contract = new Contract(
        walletConnection.account(), // the account object that is connecting
        walletConf.name, // contextValue.currentWalletConf.address,
        {
          // name of contract you're connecting to
          viewMethods: [
            "total_number_of_orgs",
            "show_organization",
            "show_tip_receiver",
            "check_if_owner",
            "check_if_tip_receiver",
            "show_receiver_photo",
            "check_and_show_if_team_member",
          ], // view methods do not change state but usually return a value
          changeMethods: [
            "add_organization",
            "add_tip_receiver_to_org",
            "add_team_to_org",
            "add_employee_to_team",
            "remove_tip_receiver_from_org",
            "delete_team_from_org",
            "remove_empoloyee_from_team",
            "change_team_name",
            "change_team_percentage",
            "change_tip_receiver_name",
            "change_tip_receiver_photo",
            "send_tips",
            "withdraw_tips_by_tip_receiver",
            "withdraw_teams",
          ], // change methods modify state
        }
      );

      return contract;
    }
    return null;
  } catch (error) {
    // addErrorNotification({
    //   title: (error as Error).message || "Processing error. Try again!",
    // });
    return null;
  }
};

export const isValidNearAddress = (address: string) => true;

export const formatNumber = (from: string) =>
  +utils.format.formatNearAmount(from);

export const formatBignumber = (from: string) => {
  const res = utils.format.parseNearAmount(from);
  if (res) return res;
  return "";
};

export const formatNearAddressStr = ({ address, format }: IFormatAddressStr) =>
  address;
