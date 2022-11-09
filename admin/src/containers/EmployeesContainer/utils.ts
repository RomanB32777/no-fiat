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

export type { cardObjType, callbackType, sendTeamData };
