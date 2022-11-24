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
import {
  addOrganization,
  showOrganization,
} from "./organizationMethods";
import {
  addEmployeeToOrg,
  editEmployeeInOrg,
  getEmployeeInfo,
  getEmployeeBase,
  removeEmployeeFromOrg,
  changeEmployeePhoto,
  getEmployeePhoto,
} from "./employeeMethods";
import {
  addEmployeeToTeam,
  addTeamToOrg,
  changeTeamName,
  changeTeamPercentage,
  deleteTeamFromOrg,
  removeEmpoloyeeFromTeam,
} from "./teamMethods";
import {
  sendTips,
  withdrawTeams,
  withdrawTipsByEmployee,
} from "./tipsMethods";

export const tronlinkMethods = {
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

  // tips
  sendTips,
  withdrawTeams,
  withdrawTipsByEmployee,
};

// export const tronlinkMethods: IWalletMethods = {
//   formatNumber,
//   formatBignumber,
//   formatAddressStr: (formatObj) => formatAddressStr(formatObj),
//   getWalletUserData() {
//     return getUserWallet(this);
//   },
//   getBlockchainContractData() {
//     return getContractData();
//   },
//   getBalance() {
//     return getBalance(this);
//   },
//   isValidAddress: (address) => isValidAddress(address),

//   // user
//   checkIfOwner() {
//     return checkIsOwner(this);
//   },
//   checkIfTipReciever(address) {
//     return checkIsTipReciever(this, address);
//   },
//   checkIsTeamMember(address) {
//     return checkIsTeamMember({ address, methods: this });
//   },

//   // organization
//   addOrganization(objForCreateOrganization) {
//     return addOrganization(objForCreateOrganization, this);
//   },
//   showOrganization(ownerAddress) {
//     return showOrganization(this, ownerAddress);
//   },

//   // team
//   addTeamToOrg(team) {
//     return addTeamToOrg(team, this);
//   },
//   deleteTeamFromOrg(organizationName) {
//     return deleteTeamFromOrg(organizationName, this);
//   },
//   changeTeamName(oldName, newName) {
//     return changeTeamName(oldName, newName, this);
//   },
//   changeTeamPercentage(teamName, newPercentageToPay) {
//     return changeTeamPercentage(teamName, newPercentageToPay, this);
//   },
//   addEmployeeToTeam(teamName, employeeAddress) {
//     return addEmployeeToTeam(teamName, employeeAddress, this);
//   },
//   removeEmpoloyeeFromTeam(teamName, employeeAddress) {
//     return removeEmpoloyeeFromTeam(teamName, employeeAddress, this);
//   },

//   //employee
//   addEmployeeToOrg(employee) {
//     return addEmployeeToOrg(employee, this);
//   },
//   getEmployeeInfo(employeeAddress) {
//     return getEmployeeInfo(employeeAddress, this);
//   },
//   getEmployeeBase(employeeAddress) {
//     return getEmployeeBase(employeeAddress, this);
//   },
//   getEmployeePhoto(employeeAddress) {
//     return getEmployeePhoto(employeeAddress, this);
//   },
//   changeEmployeePhoto(changePhotoObj) {
//     return changeEmployeePhoto(changePhotoObj, this);
//   },
//   editEmployeeInOrg(employee) {
//     return editEmployeeName(employee, this);
//   },
//   removeEmployeeFromOrg(employeeAddress) {
//     return removeEmployeeFromOrg(employeeAddress, this);
//   },

//   // tips
//   sendTips(forSendTipsObj) {
//     return sendTips(forSendTipsObj, this);
//   },
//   withdrawTeams() {
//     return withdrawTeams(this);
//   },
//   withdrawTipsByEmployee() {
//     return withdrawTipsByEmployee(this);
//   },
// };
