import { IUser, userRoles } from "../../../types";

export const SET_USER = "SET_USER";

export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

export const login = (payload: userRoles) => ({
  type: LOGIN,
  payload,
});

export const logout = () => ({
  type: LOGOUT,
});

export const setUser = (payload: IUser) => ({ type: SET_USER, payload });
