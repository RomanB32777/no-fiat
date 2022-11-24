import { ITeam, IWalletConf } from "../../../types";
import {
  addErrorNotification,
  addSuccessNotification,
} from "../../notifications";

//teams
export async function addTeamToOrg(this: IWalletConf, team: ITeam) {
  try {
    const { name, employeesInTeam, percentageToPay } = team;
    const formatEmpoyees = employeesInTeam.map((e) =>
      this.formatAddressStr({ address: e, format: "toHex" })
    );
    const contractData = await this.getBlockchainContractData();
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
}

export async function deleteTeamFromOrg(
  this: IWalletConf,
  organizationName: string
) {
  try {
    const contractData = await this.getBlockchainContractData();
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
}

export async function changeTeamName(
  this: IWalletConf,
  oldName: string,
  newName: string
) {
  try {
    const contractData = await this.getBlockchainContractData();
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
}

export async function changeTeamPercentage(
  this: IWalletConf,
  teamName: string,
  newPercentageToPay: number
) {
  try {
    const contractData = await this.getBlockchainContractData();
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
}

export async function addEmployeeToTeam(
  this: IWalletConf,
  teamName: string,
  employeeAddress: string
) {
  try {
    const contractData = await this.getBlockchainContractData();
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
}

export async function removeEmpoloyeeFromTeam(
  this: IWalletConf,
  teamName: string,
  employeeAddress: string
) {
  try {
    const contractData = await this.getBlockchainContractData();
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
}
