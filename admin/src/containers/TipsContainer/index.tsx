import React, { useMemo } from "react";
import { Col, Row } from "antd";

import BaseButton from "../../components/BaseButton";

import useWindowDimensions from "../../hooks/useWindowDimensions";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getOrganization } from "../../store/types/Organization";
import { getEmployee } from "../../store/types/Employee";
import { userRoles } from "../../types";
import { currentBlockchainConf, currentWalletConf } from "../../consts";
import "./styles.sass";

const tipsText: { [role in userRoles]: React.ReactNode } = {
  owner: "Pending balance to you and teams",
  employee: "Available balance to withdraw",
};

const TipsContainer = () => {
  const { isMobile } = useWindowDimensions();
  const dispatch = useAppDispatch();
  const { user, organization, employee } = useAppSelector((state) => state);

  const withdrawClick = async () => {
    const withdrawInfo = isOwner
      ? await currentWalletConf.withdrawTeams()
      : await currentWalletConf.withdrawTipsByEmployee();
    if (withdrawInfo) {
      console.log(withdrawInfo);
      isOwner ? dispatch(getOrganization()) : dispatch(getEmployee());
    }
  };

  const isOwner = useMemo(() => user.userRole === "owner", [user]);

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
              <Col span={18} className="tips-text">{tipsText[user.userRole]}</Col>
              <Col span={4} className="tips-sum">
                {isOwner
                  ? organization.teamsAmountToWithdraw
                  : employee.tipAmountToWithdraw}{" "}
                {currentBlockchainConf?.nativeCurrency.symbol}
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
