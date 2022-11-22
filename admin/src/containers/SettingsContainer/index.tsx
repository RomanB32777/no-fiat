import { useContext, useEffect, useMemo, useState } from "react";
import { Col, Row } from "antd";

import Loader from "../../components/Loader";
import FormInput from "../../components/FormInput";
import QrBlock from "../../components/QrBlock";
import { WalletContext } from "../../contexts/Wallet";

import { useAppSelector } from "../../store/hooks";
import { copyStr, shortStr } from "../../utils";
import { baseURL } from "../../consts";
import "./styles.sass";

const SettingsContainer = () => {
  const { currentWalletConf } = useContext(WalletContext);
  const { user, employee } = useAppSelector((state) => state);
  const [formSettings, setFormSettings] = useState<{
    userAddress: string;
    tipsLink: string;
  }>({
    userAddress: "",
    tipsLink: "",
  });

  useEffect(() => {
    const getUserData = async () => {
      const walletData = await currentWalletConf.getWalletUserData();
      const ownerAddress =
        user.userRole === "owner" ? walletData.userAddress : employee.orgOwner;

      walletData.userAddress &&
        setFormSettings({
          userAddress: walletData.userAddress,
          tipsLink: `${baseURL}/send-tips/${ownerAddress}`,
        });
    };
    getUserData();
  }, [user, employee]);

  const { userAddress, tipsLink } = formSettings;

  const shortWalletAddress = useMemo(
    () => userAddress && shortStr(userAddress, 12),
    [userAddress]
  );

  const isLoading = useMemo(
    () => Object.values(formSettings).every((val) => !Boolean(val)),
    [formSettings]
  );

  if (isLoading) return <Loader size="large" />;

  return (
    <div className="settings-page">
      <div className="header">
        <p className="section-title title">Settings</p>
      </div>
      <div className="form">
        <Row gutter={[0, 36]} className="form">
          <Col xl={16} xs={24}>
            <div className="form-element">
              <FormInput
                label="Wallet:"
                name="wallet"
                value={shortWalletAddress}
                addonBefore={
                  <div className="walletIcon">
                    <img
                      width="20"
                      src={currentWalletConf.icon}
                      alt="walletIcon"
                    />
                  </div>
                }
                labelCol={24}
                InputCol={12}
                gutter={[0, 16]}
                onClick={() => {
                  copyStr(userAddress);
                }}
                // mobileInputCol={18}
                // afterEl={
                //   <>
                //     <Col md={11} xs={5}>
                //       <div className="form-element__action">
                //         <span
                //           onClick={() => {
                //             copyStr(userAddress);
                //           }}
                //         >
                //           Copy
                //         </span>
                //       </div>
                //     </Col>
                //   </>
                // }
              />
            </div>
          </Col>
          <>
            <Col xl={16} xs={24}>
              <div className="form-element">
                <FormInput
                  label="Tips link:"
                  name="tipsLink"
                  value={tipsLink}
                  labelCol={24}
                  InputCol={12}
                  gutter={[0, 16]}
                  onClick={() => {
                    copyStr(tipsLink);
                  }}
                />
              </div>
            </Col>
            <Col xl={16} xs={24}>
              <div className="form-element">
                <QrBlock
                  label="QR code:"
                  value={tipsLink}
                  labelCol={24}
                  InputCol={6}
                  gutter={[0, 16]}
                />
              </div>
            </Col>
          </>
        </Row>
      </div>
    </div>
  );
};

export default SettingsContainer;
