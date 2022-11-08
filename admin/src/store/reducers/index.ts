import { combineReducers } from "redux";
import UserReducer from "./User/UserReducer";
import LoadingReducer from "./Loading/LoadingReducer";
import WalletReducer from "./Wallet/WalletReducer";
import OrganizationReducer from "./Organization/OrganizationReducer";
import EmployeeReducer from "./Employee/EmployeeReducer";

const rootReducer = combineReducers({
  user: UserReducer,
  loading: LoadingReducer,
  organization: OrganizationReducer,
  employee: EmployeeReducer,

  // old
  wallet: WalletReducer,
});

export { rootReducer };
