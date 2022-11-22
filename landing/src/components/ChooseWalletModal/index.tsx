import { wallets } from "../../consts";
import { addInstallWalletNotification } from "../../utils";

import "./styles.sass";

const ChooseBlockchainsModal = () => {
  const registrationWalletClick = async (name: string) => {
    const { installLink, appLink, isInstallMethod } = wallets[name];

    const navigateMethod = () => window.open(appLink, "_blank");

    isInstallMethod()
      ? navigateMethod()
      : addInstallWalletNotification(name, installLink);
  };

  return (
    <div className="wallet-popup">
      <p className="wallet-popup__main-title">Choose the wallet</p>
      <div className="wallet-popup__registration_wallets">
        {Object.keys(wallets).map((walletName) => {
          const { img, name } = wallets[walletName];
          return (
            <div
              className="wallet-popup__registration_wallets-item"
              key={walletName}
            >
              <div className="wallet-popup__registration_wallets-img">
                <img src={img} alt={walletName + "_icon"} />
              </div>
              <div
                className="wallet-popup__registration_wallets-btn"
                onClick={() => registrationWalletClick(walletName)}
              >
                Sign up with {walletName.toUpperCase()}
              </div>
              <div className="wallet-popup__registration_wallets-descr">
                Working on {name}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChooseBlockchainsModal;
