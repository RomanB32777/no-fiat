import { currentWalletConf } from "../../consts";
import { ITeam, teamFields } from "../../types";

type cardObjType = {
  address?: string;
  name?: string;
};

type callbackType = (data?: any) => void;

type sendTeamData = {
  team: ITeam;
  field: teamFields | null;
  // callback?: callbackType;
};

export const checkChangedEmployees = (
  firstTeamState: ITeam,
  secondTeamState: ITeam
) =>
  firstTeamState.employeesInTeam.find(
    (e) => secondTeamState.employeesInTeam.indexOf(e) < 0
  );

export const checkExistAddressInArr = (
  arrAddress: string,
  checkAddress: string
) =>
  arrAddress === checkAddress ||
  arrAddress ===
    currentWalletConf.formatAddressStr({
      address: checkAddress,
      format: "fromHex",
    });

export type { cardObjType, callbackType, sendTeamData };
