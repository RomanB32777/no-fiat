import { all } from "redux-saga/effects";
import { WalletWatcher } from "./Wallet/WalletWatcher";
import { EmployeeWatcher } from "./Employee/EmployeeWatcher";
import { OrganizationWatcher } from "./Organization/OrganizationWatcher";
import { TeamMemberWatcher } from "./TeamMember/TeamMemberWatcher";

export function* rootWatcher() {
  yield all([
    WalletWatcher(),
    OrganizationWatcher(),
    EmployeeWatcher(),
    TeamMemberWatcher(),
  ]);
}
