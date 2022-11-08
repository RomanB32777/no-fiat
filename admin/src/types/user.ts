type userRoles = "owner" | "employee";

interface IUser {
  isAuth: boolean;
  userRole?: userRoles;
}

interface IUserAction {
  type: string;
  payload?: userRoles;
}

export type { userRoles, IUser, IUserAction };
