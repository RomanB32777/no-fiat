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

interface IEmployeeInTeam {
  isExist: boolean;
  owner: string;
  orgName: string;
  teamName: string;
  percentageToPay: number;
}

interface ITeam {
  name: string;
  employeesInTeam: string[];
  percentageToPay: number;
}

type teamFields = keyof ITeam;

interface IOrganization {
  organizationAddress?: string;
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

interface IEmployeeInTeamAction {
  type: string;
  payload: IEmployeeInTeam;
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
  IEmployeeInTeam,
  ITeam,
  teamFields,
  IOrganization,
  IEmployeeAction,
  IEmployeeInTeamAction,
  IOrganizationAction,
  IForTipsOrganizationAction,
};
