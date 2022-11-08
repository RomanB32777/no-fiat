import { IUser, IUserAction } from "../../../types";
import { LOGIN, LOGOUT } from "../../types/User";

const initialState: IUser = {
  isAuth: false,
};

const loginAction = (state: IUser, action: IUserAction): IUser => ({
  ...state,
  isAuth: true,
  userRole: action.payload,
});
const logoutAction = (state: IUser): IUser => ({
  ...state,
  isAuth: false,
});

const UserReducer = (state = initialState, action: IUserAction) => {
  switch (action.type) {
    case LOGIN:
      return loginAction(state, action);

    case LOGOUT:
      return logoutAction(state);

    default:
      return state;
  }
};

export default UserReducer;
