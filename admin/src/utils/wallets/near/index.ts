import { IWalletMethods } from "../../../types";

import {
  getNearContractData,
  getNearUserWallet,
  formatNumber,
  formatBignumber,
  formatNearAddressStr,
  isValidNearAddress,
} from "./contractMethods";
import {
  checkIsOwner,
  checkIsTeamMember,
  checkIsTipReciever,
  getNearBalance,
} from "./userMethods";
import {
  addNearOrganization,
  showNearOrganization,
} from "./organizationMethods";
import {
  addNearEmployeeToOrg,
  editNearEmployeeName,
  getNearEmployeeInfo,
  getNearEmployeeBase,
  removeNearEmployeeFromOrg,
  changeNearEmployeePhoto,
  getNearEmployeePhoto,
} from "./employeeMethods";
import {
  addNearEmployeeToTeam,
  addNearTeamToOrg,
  changeNearTeamName,
  changeNearTeamPercentage,
  deleteNearTeamFromOrg,
  removeNearEmpoloyeeFromTeam,
} from "./teamMethods";
import {
  sendNearTips,
  withdrawNearTeams,
  withdrawNearTipsByEmployee,
} from "./tipsMethods";

export const nearMethods: IWalletMethods = {
  formatNumber,
  formatBignumber,
  formatAddressStr: (formatObj) => formatNearAddressStr(formatObj),
  getWalletUserData() {
    return getNearUserWallet(this);
  },
  getBlockchainContractData() {
    return getNearContractData(this);
  },
  getBalance() {
    return getNearBalance(this);
  },
  isValidAddress: (address) => isValidNearAddress(address),

  // user
  checkIfOwner() {
    return checkIsOwner(this);
  },
  checkIfTipReciever() {
    return checkIsTipReciever(this);
  },
  checkIsTeamMember(address) {
    return checkIsTeamMember({ address, methods: this });
  },

  // organization
  addOrganization(objForCreateOrganization) {
    return addNearOrganization(objForCreateOrganization, this);
  },
  showOrganization(ownerAddress) {
    return showNearOrganization(this, ownerAddress);
  },

  // team
  addTeamToOrg(team) {
    return addNearTeamToOrg(team, this);
  },
  deleteTeamFromOrg(organizationName) {
    return deleteNearTeamFromOrg(organizationName, this);
  },
  changeTeamName(oldName, newName) {
    return changeNearTeamName(oldName, newName, this);
  },
  changeTeamPercentage(teamName, newPercentageToPay) {
    return changeNearTeamPercentage(teamName, newPercentageToPay, this);
  },
  addEmployeeToTeam(teamName, employeeAddress) {
    return addNearEmployeeToTeam(teamName, employeeAddress, this);
  },
  removeEmpoloyeeFromTeam(teamName, employeeAddress) {
    return removeNearEmpoloyeeFromTeam(teamName, employeeAddress, this);
  },

  //employee
  addEmployeeToOrg(employee) {
    return addNearEmployeeToOrg(employee, this);
  },
  getEmployeeInfo(employeeAddress) {
    return getNearEmployeeInfo(employeeAddress, this);
  },
  getEmployeeBase(employeeAddress) {
    return getNearEmployeeBase(employeeAddress, this);
  },
  getEmployeePhoto(employeeAddress) {
    return getNearEmployeePhoto(employeeAddress, this);
  },
  changeEmployeePhoto(changePhotoObj) {
    return changeNearEmployeePhoto(changePhotoObj, this);
  },
  editEmployeeInOrg(employee) {
    return editNearEmployeeName(employee, this);
  },
  removeEmployeeFromOrg(employeeAddress) {
    return removeNearEmployeeFromOrg(employeeAddress, this);
  },

  // tips
  sendTips(forSendTipsObj) {
    return sendNearTips(forSendTipsObj, this);
  },
  withdrawTeams() {
    return withdrawNearTeams(this);
  },
  withdrawTipsByEmployee() {
    return withdrawNearTipsByEmployee(this);
  },
};
