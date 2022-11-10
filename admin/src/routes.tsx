import { useEffect } from "react";
import { Navigate, useRoutes, Outlet, RouteObject } from "react-router";
import { useAppDispatch, useAppSelector } from "./store/hooks";

import MainPage from "./pages/MainPage";
import SettingsPage from "./pages/SettingsPage";
import EmployeesPage from "./pages/EmployeesPage";
import RegistrationPage from "./pages/RegistrationPage";
import SendTipsPage from "./pages/SendTipsPage";
import NoPage from "./pages/NoPage";
import TipsPage from "./pages/TipsPage";
import Loader from "./components/Loader";

import { userRoles } from "./types";
import { getWallet } from "./store/types/Wallet";

interface IRoute extends RouteObject {
  path?: string;
  index?: boolean;
  name?: string;
  menu?: boolean;
  element?: React.ReactNode | null;
  errorElement?: React.ReactNode | null;
  icon?: React.ReactNode;
  children?: IRoute[];
  roleRequired?: string;
  protected?: boolean;
  menuOrder?: number;
  transparet?: boolean;
  hiddenLayoutElements?: boolean;
  noPaddingMainConteiner?: boolean;
  showLogo?: boolean;
}

//protected Route state
type ProtectedRouteType = {
  roleRequired?: userRoles;
};

const ProtectedRoutes = (props: ProtectedRouteType) => {
  const dispatch = useAppDispatch();
  const { user, loading } = useAppSelector((state) => state);

  useEffect(() => {
    !user.userRole && dispatch(getWallet());
  }, []);

  if (!user.userRole && loading) return <Loader size="big" />;

  //if the role required is there or not
  if (props.roleRequired) {
    return user.userRole ? (
      props.roleRequired === user.userRole ? (
        <Outlet />
      ) : (
        <Navigate to="/" />
      )
    ) : (
      <Navigate to="/register" state={true} />
    );
  } else {
    return user.isAuth ? <Outlet /> : <Navigate to="/register" state={true} />;
  }
};

export const routers: IRoute[] = [
  {
    path: "/",
    element: <ProtectedRoutes />,
    protected: true,
    children: [
      {
        index: true,
        path: "/",
        element: <MainPage />,
        name: "Dashboard",
        menu: true,
        menuOrder: 1,
      },
      {
        path: "tips",
        element: <TipsPage />,
        name: "Tips",
        menu: true,
        menuOrder: 2,
      },
      {
        path: "employees",
        element: <ProtectedRoutes roleRequired="owner" />,
        roleRequired: "owner",
        protected: true,
        children: [
          {
            index: true,
            element: <EmployeesPage />,
            name: "Employees",
            menu: true,
            menuOrder: 3,
          },
        ],
      },

      {
        path: "settings",
        element: <SettingsPage />,
        name: "Settings",
        menu: true,
        menuOrder: 4,
      },
    ],
  },
  {
    path: "register",
    hiddenLayoutElements: true,
    element: <RegistrationPage />,
  },
  {
    path: "send-tips/:owner",
    element: <SendTipsPage />,
    hiddenLayoutElements: true,
    noPaddingMainConteiner: true,
    showLogo: true,
  },
  {
    path: "*",
    element: <NoPage />,
  },
];

export const Pages = () => {
  const pages = useRoutes(routers);
  return pages;
};

export type { IRoute, userRoles };
