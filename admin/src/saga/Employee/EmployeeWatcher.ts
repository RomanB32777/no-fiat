import { call, put, takeEvery } from "redux-saga/effects";
import { GET_EMPLOYEE, setEmployee } from "../../store/types/Employee";
import { setLoading } from "../../store/types/Loading";
import { IEmployee, IGetEmployeeAction } from "../../types";
import { currentWalletConf } from "../../consts";

const asyncGetEmployee = async (address: string) => {
  console.log(address);
  const user = await currentWalletConf.getEmployeeInfo(address);
  if (user) return user;
  return {};
};

function* EmployeeWorker(action: IGetEmployeeAction): any {
  yield put(setLoading(true));
  const employee: IEmployee = yield call(asyncGetEmployee, action.payload);
  if (employee.name) {
    yield put(setEmployee(employee));
  }
  yield put(setLoading(false));
}

export function* EmployeeWatcher() {
  yield takeEvery(GET_EMPLOYEE, EmployeeWorker);
}
