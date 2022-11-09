import { useEffect, useMemo, useState } from "react";
import { Col, Row } from "antd";

import FormInput from "../../components/FormInput";
import QrBlock from "../../components/QrBlock";

import { useAppSelector } from "../../store/hooks";
import { copyStr, shortStr } from "../../utils";
import { baseURL, currentWalletConf } from "../../consts";
import "./styles.sass";
import Loader from "../../components/Loader";

const SettingsContainer = () => {
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
        user.userRole === "owner"
          ? walletData.userAddress
          : employee.orgOwner;

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

  if (isLoading) return <Loader size="big" />;

  return (
    <div className="settings-page">
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
                mobileInputCol={18}
                gutter={[0, 16]}
                afterEl={
                  <>
                    {/* <Col md={3} xs={24}> */}
                    <Col md={11} xs={5}>
                      <div
                        className="form-element__action"
                        onClick={() => {
                          copyStr(userAddress);
                        }}
                      >
                        <span>Copy</span>
                      </div>
                    </Col>
                    {/* <Col md={7} xs={24}>
                      <div
                        className="form-element__action"
                        onClick={() => {
                          // copyStr(wallet);
                        }}
                      >
                        <span>Log-out</span>
                      </div>
                    </Col> */}
                  </>
                }
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
                  mobileInputCol={18}
                  gutter={[0, 16]}
                  afterEl={
                    <Col md={11} xs={5}>
                      <div className="form-element__action">
                        <span
                          onClick={() => {
                            copyStr(tipsLink);
                          }}
                        >
                          Copy
                        </span>
                      </div>
                    </Col>
                  }
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
