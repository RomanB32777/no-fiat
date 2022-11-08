import { ReactNotifications } from "react-notifications-component";

import LayoutApp from "./containers/LayoutContainer";

import "react-notifications-component/dist/theme.css";
import "antd/dist/antd.css";
import "./commonStyles/main.sass";

function App() {
  return (
    <div>
      <ReactNotifications />
      <LayoutApp />
    </div>
  );
}

export default App;
