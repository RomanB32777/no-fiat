import { IEmployee, IEmployeeAction } from "../../../types";
import { SET_EMPLOYEE } from "../../types/Employee";

const initialState: IEmployee = {
  name: "",
  address: "",
  photoLink: "",
  orgOwner: "",
  dates: [],
  reviews: [],
  tipSum: [],
  tipAmountToWithdraw: 0,
};

const EmployeeReducer = (state = initialState, action: IEmployeeAction) => {
  switch (action.type) {
    case SET_EMPLOYEE:
      return { ...state, ...action.payload };

    default:
      return state;
  }
};

export default EmployeeReducer;
