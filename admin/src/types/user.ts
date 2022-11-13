type userRoles = "owner" | "employee" | "member";

interface IUser {
  isAuth: boolean;
  userRole?: userRoles;
}

interface IUserAction {
  type: string;
  payload?: userRoles;
}

export type { userRoles, IUser, IUserAction };
