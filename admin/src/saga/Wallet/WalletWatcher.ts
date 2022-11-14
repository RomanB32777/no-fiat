import { call, put, takeEvery } from "redux-saga/effects";
import { currentWalletConf } from "../../consts";
import { getEmployee } from "../../store/types/Employee";
import { setLoading } from "../../store/types/Loading";
import { getOrganization } from "../../store/types/Organization";
import { getEmployeeInTeam } from "../../store/types/TeamMember";
import { login } from "../../store/types/User";
import { GET_WALLET } from "../../store/types/Wallet";
import { userRoles } from "../../types";

export const asyncGetWallet = async () => {
  const { userAddress } = await currentWalletConf.getWalletUserData();

  if (userAddress) {
    const isOwner = await currentWalletConf.checkIfOwner();
    if (isOwner) return "owner";
    else {
      const tipRecieverData = await currentWalletConf.checkIfTipReciever();
      if (tipRecieverData) return "employee";
      else {
        const teamUser = await currentWalletConf.checkIsTeamMember();
        if (teamUser.isExist) return "member";
      }
    }
  } else return null;
};

function* WalletWorker(): any {
  yield put(setLoading(true));
  const user: userRoles | null = yield call(asyncGetWallet);
  console.log(user);

  if (user) {
    if (user !== "member") yield put(login(user)); // owner or employee

    if (user === "employee") yield put(getEmployee());
    else if (user === "owner") yield put(getOrganization());
    else if (user === "member") yield put(getEmployeeInTeam());
  } else yield put(setLoading(false));
}

export function* WalletWatcher() {
  yield takeEvery(GET_WALLET, WalletWorker);
}
