import { call, put, takeEvery } from "redux-saga/effects";
import { currentWalletConf } from "../../consts";
import { getEmployee } from "../../store/types/Employee";
import { setLoading } from "../../store/types/Loading";
import { getOrganization } from "../../store/types/Organization";
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
    }
  } else return null;
};

function* WalletWorker(): any {
  console.log("WalletWorker");
  yield put(setLoading(true));
  const user: userRoles | null = yield call(asyncGetWallet);
  if (user) {
    yield put(login(user));
    if (user === "employee") {
      yield put(getEmployee());
    } else {
      yield put(getOrganization());
    }
  }
  yield put(setLoading(false));
}

export function* WalletWatcher() {
  yield takeEvery(GET_WALLET, WalletWorker);
}
