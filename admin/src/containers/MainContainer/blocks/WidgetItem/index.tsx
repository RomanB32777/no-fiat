import { useEffect, useState } from "react";
import { Avatar, Col, Row } from "antd";
import { StarOutlined } from "@ant-design/icons";
import { IRatingTipsItem } from "../../utils";
import "./styles.sass";

interface IWidgetItem {
  itemData: IRatingTipsItem;
  usdtKoef: number;
}

const WidgetItem = ({ itemData, usdtKoef }: IWidgetItem) => {
  const { address, photoLink, name, review, amountTips, sum } = itemData;
  return (
    <Col xs={24} sm={12} xl={8} key={address}>
      <div className="widget__item">
        <Row style={{ width: "100%" }} justify="space-between">
          <Col span={8}>
            <Avatar size={80} src={photoLink} />
          </Col>
          <Col span={16} style={{ height: 80 }}>
            <Row justify="space-between" style={{ height: "100%" }}>
              <Col span={13}>
                <div className="widget__item_row">
                  <div className="name">{name}</div>
                  <div className="review">
                    {review.toFixed(1)} <StarOutlined />
                  </div>
                </div>
              </Col>
              <Col span={10}>
                <div className="widget__item_row">
                  <div className="sum">{(sum * usdtKoef).toFixed(1)} USD</div>
                  <div className="tips">{amountTips} tips</div>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </Col>
  );
};

export default WidgetItem;
