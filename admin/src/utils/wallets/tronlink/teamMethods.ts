import { ITeam, IWalletMethods } from "../../../types";
import {
  addErrorNotification,
  addSuccessNotification,
} from "../../notifications";

//teams
export const addTronTeamToOrg = async (
  team: ITeam,
  methods: IWalletMethods
) => {
  try {
    const { name, employeesInTeam, percentageToPay } = team;
    const formatEmpoyees = employeesInTeam.map((e) =>
      methods.formatAddressStr({ address: e, format: "toHex" })
    );
    const contractData = await methods.getBlockchainContractData();
    const organizationInfo = await contractData
      .addTeamToOrg(name, formatEmpoyees, percentageToPay)
      .send();
    addSuccessNotification({
      title: "Processed successfully!",
    });
    return organizationInfo;
  } catch (error) {
    addErrorNotification({
      title: (error as Error).message || "Processing error. Try again!",
    });
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
    addSuccessNotification({
      title: "Processed successfully!",
    });
    return removedOrganization;
  } catch (error) {
    addErrorNotification({
      title: (error as Error).message || "Processing error. Try again!",
    });
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
    addSuccessNotification({
      title: "Processed successfully!",
    });
    return teamInfo;
  } catch (error) {
    addErrorNotification({
      title: (error as Error).message || "Processing error. Try again!",
    });
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
    addSuccessNotification({
      title: "Processed successfully!",
    });
    return teamInfo;
  } catch (error) {
    addErrorNotification({
      title: (error as Error).message || "Processing error. Try again!",
    });
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
    addSuccessNotification({
      title: "Processed successfully!",
    });
    return teamInfo;
  } catch (error) {
    console.log((error as Error).message);
    addErrorNotification({
      title: (error as Error).message || "Processing error. Try again!",
    });
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
      .removeEmployeeFromTeam(teamName, employeeAddress)
      .send();
    addSuccessNotification({
      title: "Processed successfully!",
    });
    return teamInfo;
  } catch (error) {
    console.log((error as Error).message);
    addErrorNotification({
      title: (error as Error).message || "Processing error. Try again!",
    });
    return false;
  }
};
