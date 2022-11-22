import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";

import { ReactNotifications, Store } from "react-notifications-component";

import LayoutApp from "./containers/LayoutContainer";

import "react-notifications-component/dist/theme.css";
import "antd/dist/antd.css";
import "./commonStyles/main.sass";

function App() {
  useEffect(() => {
    const notifWrapper = document.querySelector(".app-notif");
    const notifWrapperClick = () => Store.removeAllNotifications();

    notifWrapper?.addEventListener("click", notifWrapperClick);
    return () => notifWrapper?.removeEventListener("click", notifWrapperClick);
  }, []);

  return (
    <BrowserRouter>
      <ReactNotifications className="app-notif" />
      <LayoutApp />
    </BrowserRouter>
  );
}

export default App;
