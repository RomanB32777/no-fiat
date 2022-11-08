import { call, put, takeEvery } from "redux-saga/effects";
import { currentWalletConf } from "../../consts";
import { setLoading } from "../../store/types/Loading";
import {
  GET_ORGANIZATION,
  setOrganization,
} from "../../store/types/Organization";
import { IForTipsOrganizationAction, IOrganization } from "../../types";

export const asyncGetOrganization = async (ownerAddress?: string) => {
  const organization = await currentWalletConf.showOrganization(ownerAddress);
  return organization;
};

function* OrganizationWorker(action: IForTipsOrganizationAction): any {
  yield put(setLoading(true));
  const organization: IOrganization = yield call(
    asyncGetOrganization,
    action.payload
  );
  if (organization.organizationAddress) {
    // initialized
    yield put(setOrganization(organization));
  }
  yield put(setLoading(false));
}

export function* OrganizationWatcher() {
  yield takeEvery(GET_ORGANIZATION, OrganizationWorker);
}
