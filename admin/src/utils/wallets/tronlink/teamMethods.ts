import { ITeam, IWalletMethods } from "../../../types";

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
    return organizationInfo;
  } catch (error) {
    console.log(error);
    return false;
  }
};

// export const addTronTeamToOrg = async (
//   team: ITeam,
//   methods: IWalletMethods
// ) => {
//   try {
//     // const { name, employeesInTeam, percentageToPay } = team;
//     // const formatEmpoyees = employeesInTeam.map((e) =>
//     //   methods.formatAddressStr({ address: e, format: "toHex" })
//     // );
//     // console.log(name, formatEmpoyees, percentageToPay);
//     // const contractData = await methods.getBlockchainContractData();
//     const name = "kitchen";
//     const addresses = [
//       "41749e4fd208fa708c981c85fdb07fc326261af532",
//       "411c909b3f6875560f41fb4cfe59c0b92d5db78076",
//     ];
//     const percentageToPay = 5;
//     let instance = await (window as any).tronWeb
//       .contract()
//       .at("TFWKMM24a4BCA81oG9F19bgHmtTJEhD2gt");
//     const organizationInfo = await instance.addTeamToOrg(name, addresses).send();
//     return organizationInfo;
//   } catch (error) {
//     console.log(error);
//     return false;
//   }
// };

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
      .removeEmployeeFromTeam(teamName, employeeAddress)
      .send();
    return teamInfo;
  } catch (error) {
    console.log(error);
    return false;
  }
};
