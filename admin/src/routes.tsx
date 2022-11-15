import { useEffect } from "react";
import { Navigate, useRoutes, Outlet, RouteObject } from "react-router";
import { useAppDispatch, useAppSelector } from "./store/hooks";

import Loader from "./components/Loader";
import MainPage from "./pages/MainPage";
import SettingsPage from "./pages/SettingsPage";
import EmployeesPage from "./pages/EmployeesPage";
import RegistrationPage from "./pages/RegistrationPage";
import SendTipsPage from "./pages/SendTipsPage";
import NoPage from "./pages/NoPage";
import TipsPage from "./pages/TipsPage";
import WelcomePage from "./pages/WelcomePage";

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
  roleRequired?: userRoles[];
  protected?: boolean;
  menuOrder?: number;
  transparet?: boolean;
  hiddenLayoutElements?: boolean;
  noPaddingMainConteiner?: boolean;
  showLogo?: boolean;
}

//protected Route state
type ProtectedRouteType = {
  roleRequired?: userRoles[];
};

const ProtectedRoutes = (props: ProtectedRouteType) => {
  const { roleRequired } = props;
  const dispatch = useAppDispatch();
  const { user, loading } = useAppSelector((state) => state);

  useEffect(() => {
    !user.userRole && dispatch(getWallet());
  }, []);

  if (!user.userRole && loading)
    return (
      <div className="app-loader">
        <Loader size="large" />
      </div>
    );

  //if the role required is there or not
  if (props.roleRequired) {
    return user.userRole ? (
      roleRequired?.includes(user.userRole) ? (
        <Outlet />
      ) : (
        <Navigate to={user.userRole === "member" ? "/welcome" : "/"} />
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
    element: <ProtectedRoutes roleRequired={["owner", "employee"]} />,
    protected: true,
    children: [
      {
        index: true,
        path: "/",
        element: <MainPage />,
        roleRequired: ["owner", "employee"],
        name: "Summary",
        menu: true,
        menuOrder: 1,
      },
      {
        path: "tips",
        element: <TipsPage />,
        roleRequired: ["owner", "employee"],
        name: "Tips",
        menu: true,
        menuOrder: 2,
      },
      {
        path: "employees",
        element: <ProtectedRoutes roleRequired={["owner"]} />,
        protected: true,
        children: [
          {
            index: true,
            element: <EmployeesPage />,
            roleRequired: ["owner"],
            name: "Employees",
            menu: true,
            menuOrder: 3,
          },
        ],
      },
      {
        path: "settings",
        element: <SettingsPage />,
        roleRequired: ["owner", "employee"],
        name: "Settings",
        menu: true,
        menuOrder: 4,
      },
    ],
  },
  {
    path: "welcome",
    element: <ProtectedRoutes roleRequired={["member"]} />,
    protected: true,
    children: [
      {
        index: true,
        element: <WelcomePage />,
        roleRequired: ["member"],
        hiddenLayoutElements: true,
        noPaddingMainConteiner: true,
        showLogo: true,
      },
    ],
  },
  {
    path: "register",
    element: <RegistrationPage />,
    hiddenLayoutElements: true,
    noPaddingMainConteiner: true,
    showLogo: true,
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
