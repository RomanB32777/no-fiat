import { useContext } from "react";
import { WalletContext } from "../../../contexts/Wallet";
import "./styles.sass";

export const HeaderBanner = () => {
  const { currentWalletConf } = useContext(WalletContext);
  return (
    <div className="navbar-banner">
      Make sure to use the service on {currentWalletConf?.chainName}
    </div>
  );
};
