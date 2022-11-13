import { currentBlockchainConf } from "../../../consts";
import "./styles.sass";

export const HeaderBanner = () => {
  return (
    <div className="navbar-banner">
      Make sure to use the service on {currentBlockchainConf?.chainName}
    </div>
  );
};
