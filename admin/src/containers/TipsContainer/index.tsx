import React, { useContext, useMemo } from "react";
import { Col, Row } from "antd";

import BaseButton from "../../components/BaseButton";
import { WalletContext } from "../../contexts/Wallet";

import useWindowDimensions from "../../hooks/useWindowDimensions";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getOrganization } from "../../store/types/Organization";
import { getEmployee } from "../../store/types/Employee";
import { addErrorNotification } from "../../utils";
import { userRoles } from "../../types";
import "./styles.sass";

const tipsText: { [role in userRoles]: React.ReactNode } = {
  owner: "Pending balance to you and teams",
  employee: "Available balance to withdraw",
  member: "",
};

const TipsContainer = () => {
  const { currentWalletConf } = useContext(WalletContext);
  const { isMobile } = useWindowDimensions();
  const dispatch = useAppDispatch();
  const { user, organization, employee } = useAppSelector((state) => state);

  const withdrawClick = async () => {
    if (amountToWithdraw > 0) {
      const withdrawInfo = isOwner
        ? await currentWalletConf.withdrawTeams()
        : await currentWalletConf.withdrawTipsByEmployee();
      if (withdrawInfo) {
        console.log(withdrawInfo);
        isOwner ? dispatch(getOrganization()) : dispatch(getEmployee());
      }
    } else {
      addErrorNotification({ title: "Balance to withdraw is zero" });
    }
  };

  const isOwner = useMemo(() => user.userRole === "owner", [user]);
  const amountToWithdraw = useMemo(
    () =>
      isOwner
        ? organization.teamsAmountToWithdraw
        : employee.tipAmountToWithdraw,
    [isOwner, organization, employee]
  );

  return (
    <div className="tips-page">
      <div className="header">
        <p className="section-title title">Tips</p>
      </div>
      <div className="content">
        {user.userRole && (
          <>
            <Row
              justify="space-between"
              align={isMobile ? "top" : "middle"}
              style={{ width: "100%" }}
            >
              <Col span={18} className="tips-text">
                {tipsText[user.userRole]}
              </Col>
              <Col span={4} className="tips-sum">
                {amountToWithdraw} {currentWalletConf?.nativeCurrency.symbol}
              </Col>
            </Row>
            <div className="btn">
              <BaseButton
                title="Withdraw"
                onClick={withdrawClick}
                padding="5px 20px "
                fontSize={isMobile ? "17px" : "25px"}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TipsContainer;
