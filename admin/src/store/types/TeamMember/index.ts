import { IEmployeeInTeam } from "../../../types";

export const GET_EMPLOYEE_IN_TEAM = "GET_EMPLOYEE_IN_TEAM";
export const SET_EMPLOYEE_IN_TEAM = "SET_EMPLOYEE_IN_TEAM";

export const getEmployeeInTeam = () => ({ type: GET_EMPLOYEE_IN_TEAM });
export const setEmployeeInTeam = (payload: IEmployeeInTeam) => ({
  type: SET_EMPLOYEE_IN_TEAM,
  payload,
});
