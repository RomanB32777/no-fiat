import { combineReducers } from "redux";
import LoadingReducer from "./Loading/LoadingReducer";
import WalletReducer from "./Wallet/WalletReducer";
import UserReducer from "./User/UserReducer";
import OrganizationReducer from "./Organization/OrganizationReducer";
import EmployeeReducer from "./Employee/EmployeeReducer";
import TeamMemberReducer from "./TeamMember/TeamMemberReducer";

const rootReducer = combineReducers({
  loading: LoadingReducer,
  wallet: WalletReducer,
  user: UserReducer,
  organization: OrganizationReducer,
  employee: EmployeeReducer,
  employeeTeam: TeamMemberReducer,
});

export { rootReducer };
