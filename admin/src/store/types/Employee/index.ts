import { IEmployee } from "../../../types";

export const GET_EMPLOYEE = "GET_EMPLOYEE";
export const SET_EMPLOYEE = "SET_EMPLOYEE";

export const getEmployee = () => ({ type: GET_EMPLOYEE });
export const setEmployee = (payload: IEmployee) => ({ type: SET_EMPLOYEE, payload });
