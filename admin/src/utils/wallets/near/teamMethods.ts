import { ITeam, IWalletMethods } from "../../../types";
import {
  addErrorNotification,
  addSuccessNotification,
} from "../../notifications";

//teams
export const addNearTeamToOrg = async (
  team: ITeam,
  methods: IWalletMethods
) => {
  try {
    const { name, employeesInTeam, percentageToPay } = team;

    const contractData = await methods.getBlockchainContractData();
    const organizationInfo = await contractData.add_team_to_org({
      name,
      employees_in_team: employeesInTeam,
      percentage_to_pay: percentageToPay,
    });
    console.log(organizationInfo);

    addSuccessNotification({
      title: "Processed successfully!",
    });
    return true; //organizationInfo;
  } catch (error) {
    addErrorNotification({
      title: (error as Error).message || "Processing error. Try again!",
    });
    return false;
  }
};

export const deleteNearTeamFromOrg = async (
  organizationName: string,
  methods: IWalletMethods
) => {
  try {
    const contractData = await methods.getBlockchainContractData();
    const removedOrganization = await contractData.delete_team_from_org({
      name: organizationName,
    });
    console.log(removedOrganization);

    addSuccessNotification({
      title: "Processed successfully!",
    });
    return true; //removedOrganization;
  } catch (error) {
    addErrorNotification({
      title: (error as Error).message || "Processing error. Try again!",
    });
    return false;
  }
};

export const changeNearTeamName = async (
  oldName: string,
  newName: string,
  methods: IWalletMethods
) => {
  try {
    const contractData = await methods.getBlockchainContractData();
    const teamInfo = await contractData.change_team_name({
      old_name: oldName,
      new_name: newName,
    });
    console.log(teamInfo);

    addSuccessNotification({
      title: "Processed successfully!",
    });
    return true; //teamInfo;
  } catch (error) {
    addErrorNotification({
      title: (error as Error).message || "Processing error. Try again!",
    });
    return false;
  }
};

export const changeNearTeamPercentage = async (
  teamName: string,
  newPercentageToPay: number,
  methods: IWalletMethods
) => {
  try {
    const contractData = await methods.getBlockchainContractData();
    const teamInfo = await contractData.change_team_percentage({
      name: teamName,
      new_percetage_to_pay: newPercentageToPay,
    });
    console.log(teamInfo);

    addSuccessNotification({
      title: "Processed successfully!",
    });
    return true; //teamInfo;
  } catch (error) {
    addErrorNotification({
      title: (error as Error).message || "Processing error. Try again!",
    });
    return false;
  }
};

export const addNearEmployeeToTeam = async (
  teamName: string,
  employeeAddress: string,
  methods: IWalletMethods
) => {
  try {
    const contractData = await methods.getBlockchainContractData();
    const teamInfo = await contractData.add_employee_to_team({
      name: teamName,
      employee_to_add: employeeAddress,
    });
    console.log(teamInfo);

    addSuccessNotification({
      title: "Processed successfully!",
    });
    return true; //teamInfo;
  } catch (error) {
    console.log((error as Error).message);
    addErrorNotification({
      title: (error as Error).message || "Processing error. Try again!",
    });
    return false;
  }
};

export const removeNearEmpoloyeeFromTeam = async (
  teamName: string,
  employeeAddress: string,
  methods: IWalletMethods
) => {
  try {
    const contractData = await methods.getBlockchainContractData();
    const teamInfo = await contractData.remove_empoloyee_from_team({
      name: teamName,
      employee_to_delete: employeeAddress,
    });
    console.log(teamInfo);

    addSuccessNotification({
      title: "Processed successfully!",
    });
    return true; // teamInfo;
  } catch (error) {
    console.log((error as Error).message);
    addErrorNotification({
      title: (error as Error).message || "Processing error. Try again!",
    });
    return false;
  }
};
