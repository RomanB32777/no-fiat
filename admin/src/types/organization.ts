interface IEmployeeBase {
  name: string;
  address: string;
  photoLink: string; // move to IEmployee ?
}

interface IEmployee extends IEmployeeBase {
  orgOwner: string;
  tipSum: number[];
  tipAmountToWithdraw: number;
  reviews: number[];
  dates: number[];
}

interface ITeam {
  name: string;
  employeesInTeam: string[];
  percentageToPay: number;
}

type teamFields = keyof ITeam;

interface IOrganization {
  organizationAddress: string;
  initialized: boolean;
  teamsPart: number;
  organizationName: string;
  teamsAmountToWithdraw: number;
  teams: ITeam[];
  allTipReceivers: string[];
}

interface IEmployeeAction {
  type: string;
  payload: IEmployee;
}

interface IOrganizationAction {
  type: string;
  payload: IOrganization;
}

interface IForTipsOrganizationAction {
  type: string;
  payload?: string;
}

export type {
  IEmployeeBase,
  IEmployee,
  ITeam,
  teamFields,
  IOrganization,
  IEmployeeAction,
  IOrganizationAction,
  IForTipsOrganizationAction,
};
