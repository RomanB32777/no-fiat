import { IWalletMethods } from "../../../types";

import {
  getTronContractData,
  getTronUserWallet,
  formatNumber,
  getTronBalance,
  formatTronAddressStr,
} from "./contractMethods";
import { checkIsOwner, checkIsTipReciever } from "./userMethods";
import {
  addTronOrganization,
  showTronOrganization,
} from "./organizationMethods";
import {
  addTronEmployeeToOrg,
  editTronEmployeeToOrg,
  getTronEmployeeInfo,
  getTronEmployeeBase,
  removeTronEmployeeFromOrg,
  changeTronEmployeePhoto,
  getTronEmployeePhoto,
} from "./employeeMethods";
import {
  addTronEmployeeToTeam,
  addTronTeamToOrg,
  changeTronTeamName,
  changeTronTeamPercentage,
  deleteTronTeamFromOrg,
  removeTronEmpoloyeeFromTeam,
} from "./teamMethods";
import {
  sendTronTips,
  withdrawTronTeams,
  withdrawTronTipAmountByEmployee,
} from "./tipsMethods";

export const tronlinkMethods: IWalletMethods = {
  formatNumber,
  formatAddressStr: (formatObj) => formatTronAddressStr(formatObj),
  getWalletUserData() {
    return getTronUserWallet(this);
  },
  getBlockchainContractData() {
    return getTronContractData();
  },
  getBalance: (objForBalance) => getTronBalance({ ...objForBalance }),

  // user
  checkIfOwner() {
    return checkIsOwner(this);
  },
  checkIfTipReciever() {
    return checkIsTipReciever(this);
  },

  // organization
  addOrganization(objForCreateOrganization) {
    return addTronOrganization(objForCreateOrganization, this);
  },
  showOrganization(ownerAddress) {
    return showTronOrganization(this, ownerAddress);
  },

  // team
  addTeamToOrg(team) {
    return addTronTeamToOrg(team, this);
  },
  deleteTeamFromOrg(organizationName) {
    return deleteTronTeamFromOrg(organizationName, this);
  },
  changeTeamName(oldName, newName) {
    return changeTronTeamName(oldName, newName, this);
  },
  changeTeamPercentage(teamName, newPercentageToPay) {
    return changeTronTeamPercentage(teamName, newPercentageToPay, this);
  },
  addEmployeeToTeam(teamName, employeeAddress) {
    return addTronEmployeeToTeam(teamName, employeeAddress, this);
  },
  removeEmpoloyeeFromTeam(teamName, employeeAddress) {
    return removeTronEmpoloyeeFromTeam(teamName, employeeAddress, this);
  },

  //employee
  addEmployeeToOrg(employee) {
    return addTronEmployeeToOrg(employee, this);
  },
  getEmployeeInfo(employeeAddress) {
    return getTronEmployeeInfo(employeeAddress, this);
  },
  getEmployeeBase(employeeAddress) {
    return getTronEmployeeBase(employeeAddress, this);
  },
  getEmployeePhoto(employeeAddress) {
    return getTronEmployeePhoto(employeeAddress, this);
  },
  changeEmployeePhoto(changePhotoObj) {
    return changeTronEmployeePhoto(changePhotoObj, this);
  },
  editEmployeeInOrg(employee) {
    return editTronEmployeeToOrg(employee, this);
  },
  removeEmployeeFromOrg(employeeAddress) {
    return removeTronEmployeeFromOrg(employeeAddress, this);
  },

  // tips
  sendTips(forSendTipsObj) {
    return sendTronTips(forSendTipsObj, this);
  },
  withdrawTeams() {
    return withdrawTronTeams(this);
  },
  withdrawTipAmountByEmployee() {
    return withdrawTronTipAmountByEmployee(this);
  },
};
