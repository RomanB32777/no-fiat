import { call, put, takeEvery, getContext } from "redux-saga/effects";
import { GET_EMPLOYEE, setEmployee } from "../../store/types/Employee";
import { setLoading } from "../../store/types/Loading";
import { IEmployee } from "../../types";
import { initEmployee } from "../../consts";
import { getOrganization } from "../../store/types/Organization";
import { IWalletContext } from "../../contexts/Wallet";

const asyncGetEmployee = async (walletContext: IWalletContext) => {
  const { userAddress } =
    await walletContext.currentWalletConf.getWalletUserData();
  if (userAddress) {
    const user = await walletContext.currentWalletConf.getEmployeeInfo(
      userAddress
    );
    if (user) return user;
  }
  return initEmployee;
};

function* EmployeeWorker(): any {
  yield put(setLoading(true));
  const walletContext = yield getContext("contextValue");
  const employee: IEmployee = yield call(asyncGetEmployee, walletContext);
  if (employee.name) {
    yield put(setEmployee(employee));
    yield put(getOrganization(employee.orgOwner));
  }
  yield put(setLoading(false));
}

export function* EmployeeWatcher() {
  yield takeEvery(GET_EMPLOYEE, EmployeeWorker);
}
