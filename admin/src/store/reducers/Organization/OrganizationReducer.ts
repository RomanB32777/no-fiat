import { IOrganizationAction } from "../../../types";
import { SET_ORGANIZATION } from "../../types/Organization";
import { initOrganization } from "../../../consts";


const OrganizationReducer = (
  state = initOrganization,
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
