import { IOrganization, IOrganizationAction } from "../../../types";
import { SET_ORGANIZATION } from "../../types/Organization";

const initialState: IOrganization = {
  organizationAddress: "",
  initialized: false,
  teamsPart: 0,
  organizationName: "",
  teamsAmountToWithdraw: 0,
  teams: [],
  allTipReceivers: [],
};

const OrganizationReducer = (
  state = initialState,
  action: IOrganizationAction
) => {
  switch (action.type) {
    case SET_ORGANIZATION:
      return { ...state, ...action.payload };

    default:
      return state;
  }
};

export default OrganizationReducer;
