import { useRoutes, RouteObject } from "react-router";
import ChooseWalletModal from "./components/ChooseWalletModal";
import LandingPage from "./pages/LandingPage";

export const routers: RouteObject[] = [
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "wallets",
    element: <ChooseWalletModal />,
  },
  {
    path: "*",
    element: <LandingPage />,
  },
];

export const Pages = () => {
  const pages = useRoutes(routers);
  return pages;
};
