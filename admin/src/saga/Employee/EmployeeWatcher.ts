import { call, put, takeEvery } from "redux-saga/effects";
import { GET_EMPLOYEE, setEmployee } from "../../store/types/Employee";
import { setLoading } from "../../store/types/Loading";
import { IEmployee } from "../../types";
import { currentWalletConf, initEmployee } from "../../consts";
import { getOrganization } from "../../store/types/Organization";

const asyncGetEmployee = async () => {
  const { userAddress } = await currentWalletConf.getWalletUserData();
  if (userAddress) {
    
    const user = await currentWalletConf.getEmployeeInfo(userAddress);
    if (user) return user;
  }
  return initEmployee;
};

function* EmployeeWorker(): any {
  yield put(setLoading(true));
  const employee: IEmployee = yield call(asyncGetEmployee);
  if (employee.name) {
    yield put(setEmployee(employee));
    yield put(getOrganization(employee.orgOwner));
  }
  yield put(setLoading(false));
}

export function* EmployeeWatcher() {
  yield takeEvery(GET_EMPLOYEE, EmployeeWorker);
}
