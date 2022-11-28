import {
  getBlockchainContractData,
  getWalletUserData,
  formatNumber,
  formatBignumber,
  formatAddressStr,
  isValidAddress,
} from "./contractMethods";
import {
  checkIfOwner,
  checkIsTeamMember,
  checkIfTipReciever,
  getBalance,
} from "./userMethods";
import { addOrganization, showOrganization } from "./organizationMethods";
import {
  addEmployeeToOrg,
  editEmployeeInOrg,
  getEmployeeInfo,
  getEmployeeBase,
  removeEmployeeFromOrg,
  changeEmployeePhoto,
  getEmployeePhoto,
  checkIsExistEmployee,
} from "./employeeMethods";
import {
  addEmployeeToTeam,
  addTeamToOrg,
  changeTeamName,
  changeTeamPercentage,
  deleteTeamFromOrg,
  removeEmpoloyeeFromTeam,
} from "./teamMethods";
import { sendTips, withdrawTeams, withdrawTipsByEmployee } from "./tipsMethods";

const logout = () => localStorage.removeItem("null_wallet_auth_key");

export const nearMethods = {
  getBlockchainContractData,
  getWalletUserData,
  formatNumber,
  formatBignumber,
  formatAddressStr,
  isValidAddress,

  // user
  checkIfOwner,
  checkIsTeamMember,
  checkIfTipReciever,
  getBalance,

  // organization
  addOrganization,
  showOrganization,

  // team
  addEmployeeToOrg,
  editEmployeeInOrg,
  getEmployeeInfo,
  getEmployeeBase,
  removeEmployeeFromOrg,
  changeEmployeePhoto,
  getEmployeePhoto,

  //employee
  addEmployeeToTeam,
  addTeamToOrg,
  changeTeamName,
  changeTeamPercentage,
  deleteTeamFromOrg,
  removeEmpoloyeeFromTeam,
  checkIsExistEmployee,

  // tips
  sendTips,
  withdrawTeams,
  withdrawTipsByEmployee,

  // app
  logout,
};
