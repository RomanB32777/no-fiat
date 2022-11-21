import { call, getContext, put, takeEvery } from "redux-saga/effects";
import { IWalletContext } from "../../contexts/Wallet";
import { setLoading } from "../../store/types/Loading";
import {
  GET_ORGANIZATION,
  setOrganization,
} from "../../store/types/Organization";
import { IForTipsOrganizationAction, IOrganization } from "../../types";

export const asyncGetOrganization = async (
  walletContext: IWalletContext,
  ownerAddress?: string
) => {
  const organization = await walletContext.currentWalletConf.showOrganization(
    ownerAddress
  );
  return organization;
};

function* OrganizationWorker(action: IForTipsOrganizationAction): any {
  yield put(setLoading(true));
  const walletContext = yield getContext("contextValue");
  const organization: IOrganization = yield call(
    asyncGetOrganization,
    walletContext,
    action.payload
  );
  if (organization.initialized) {
    // initialized
    yield put(setOrganization(organization));
  }
  yield put(setLoading(false));
}

export function* OrganizationWatcher() {
  yield takeEvery(GET_ORGANIZATION, OrganizationWorker);
}
