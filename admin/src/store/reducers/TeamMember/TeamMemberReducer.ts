import { IEmployeeInTeamAction } from "../../../types";
import { SET_EMPLOYEE_IN_TEAM } from "../../types/TeamMember";
import { initEmployeeInTeam } from "../../../consts";

const TeamMemberReducer = (
  state = initEmployeeInTeam,
  action: IEmployeeInTeamAction
) => {
  switch (action.type) {
    case SET_EMPLOYEE_IN_TEAM:
      return { ...state, ...action.payload };

    default:
      return state;
  }
};

export default TeamMemberReducer;
