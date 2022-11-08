import { ITeam, IWalletMethods } from "../../../types";

//teams
export const addTronTeamToOrg = async (
  team: ITeam,
  methods: IWalletMethods
) => {
  try {
    const { name, employeesInTeam, percentageToPay } = team;
    const contractData = await methods.getBlockchainContractData();
    const organizationInfo = await contractData
      .addTeamToOrg(name, employeesInTeam, percentageToPay)
      .send();
    return organizationInfo;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const deleteTronTeamFromOrg = async (
  organizationName: string,
  methods: IWalletMethods
) => {
  try {
    const contractData = await methods.getBlockchainContractData();
    const removedOrganization = await contractData
      .deleteTeamFromOrg(organizationName)
      .send();
    return removedOrganization;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const changeTronTeamName = async (
  oldName: string,
  newName: string,
  methods: IWalletMethods
) => {
  try {
    const contractData = await methods.getBlockchainContractData();
    const teamInfo = await contractData.changeTeamName(oldName, newName).send();
    return teamInfo;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const changeTronTeamPercentage = async (
  teamName: string,
  newPercentageToPay: number,
  methods: IWalletMethods
) => {
  try {
    const contractData = await methods.getBlockchainContractData();
    const teamInfo = await contractData
      .changeTeamPercentage(teamName, newPercentageToPay)
      .send();
    return teamInfo;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const addTronEmployeeToTeam = async (
  teamName: string,
  employeeAddress: string,
  methods: IWalletMethods
) => {
  try {
    const contractData = await methods.getBlockchainContractData();
    const teamInfo = await contractData
      .addEmployeeToTeam(teamName, employeeAddress)
      .send();
    return teamInfo;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const removeTronEmpoloyeeFromTeam = async (
  teamName: string,
  employeeAddress: string,
  methods: IWalletMethods
) => {
  try {
    const contractData = await methods.getBlockchainContractData();
    const teamInfo = await contractData
      .removeEmpoloyeeFromTeam(teamName, employeeAddress)
      .send();
    return teamInfo;
  } catch (error) {
    console.log(error);
    return false;
  }
};
