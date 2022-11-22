import { BrowserRouter } from "react-router-dom";
import { ReactNotifications } from "react-notifications-component";

import LayoutApp from "./containers/LayoutContainer";

import "react-notifications-component/dist/theme.css";
import "antd/dist/antd.css";
import "./commonStyles/main.sass";

function App() {
  return (
    <BrowserRouter>
      <ReactNotifications />
      <LayoutApp />
    </BrowserRouter>
  );
}

export default App;
