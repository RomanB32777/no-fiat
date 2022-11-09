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
    console.log(name, formatEmpoyees, percentageToPay);
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
//     const { name, employeesInTeam, percentageToPay } = team;
//     const formatEmpoyees = [
//       "TW1tZymZysw89GkdUYh3PDDeovzSKZXF2c",
//       "TTxu6qrkF3FAesFWeuJXR4yb2mUX1GEZXT",
//     ]
//     // .map((e) => methods.formatAddressStr({ address: e, format: "toHex" }));

//     const listOfAddressToHex58 = []
//     console.log(formatEmpoyees.length)
//     for (let i = 0; i < formatEmpoyees.length; i++) {
//       var a = (window as any).tronWeb.address.toHex(formatEmpoyees[i]);
//       listOfAddressToHex58.push(a);
//     }

    
//     console.log(name, listOfAddressToHex58, percentageToPay);
//     const contractData = await methods.getBlockchainContractData();


//     let instance = await (window as any).tronWeb
//         .contract()
//         .at("TFWKMM24a4BCA81oG9F19bgHmtTJEhD2gt");

//     console.log(instance);
    
//     const organizationInfo = await instance
//       .addTeamToOrg("crocs", listOfAddressToHex58, 1)
//       .send();
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
      .removeEmpoloyeeFromTeam(teamName, employeeAddress)
      .send();
    return teamInfo;
  } catch (error) {
    console.log(error);
    return false;
  }
};
