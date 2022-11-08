import { IOrganization } from "../../../types";

export const GET_ORGANIZATION = "GET_ORGANIZATION";
export const SET_ORGANIZATION = "SET_ORGANIZATION";

export const getOrganization = (payload?: string) => ({
  type: GET_ORGANIZATION,
  payload,
});

export const setOrganization = (payload: IOrganization) => ({
  type: SET_ORGANIZATION,
  payload,
});
