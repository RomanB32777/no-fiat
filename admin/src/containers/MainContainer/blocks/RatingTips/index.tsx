import { useEffect, useState } from "react";
import { Avatar, Col, Empty, Row } from "antd";
import { StarOutlined } from "@ant-design/icons";

import { filterTips } from "../../utils";
import { IEmployee, IEmployeeBase, IFiltersDates } from "../../../../types";
import "./styles.sass";

interface IRatingTipsItem extends IEmployeeBase {
  review: number;
  sum: number;
  amountTips: number;
}

const RatingTips = ({
  employees,
  filteredDates,
  usdtKoef,
}: {
  employees: IEmployee[];
  filteredDates: IFiltersDates;
  usdtKoef: number;
}) => {
  const [ratingTips, setRatingTips] = useState<IRatingTipsItem[]>([]);

  useEffect(() => {
    const getTips = async () => {
      if (employees.length) {
        const tips: IRatingTipsItem[] = employees.map(
          ({ address, name, photoLink, tipSum, reviews, dates }) => {
            const filterSum = filterTips({ arr: tipSum, dates, filteredDates });
            const filterReviews = filterTips({
              arr: reviews,
              dates,
              filteredDates,
            });
            return {
              address,
              name,
              photoLink,
              review:
                filterReviews.reduce((prev, curr) => prev + curr, 0) /
                filterReviews.length,
              sum: filterSum.reduce((prev, curr) => prev + curr, 0),
              amountTips: filterSum.length,
            };
          }
        );
        setRatingTips(tips.filter((t) => t.amountTips));
      } else setRatingTips([]);
    };
    getTips();
  }, [employees, filteredDates]);

  return (
    <div className="widget widget-ratingTips">
      <div className="widget_header">
        <span className="section-title widget_header__title">Rating / Tip</span>
      </div>

      {Boolean(ratingTips.length) ? (
        <div className="widget__items">
          <Row gutter={[16, 16]}>
            {ratingTips.map(
              ({ address, name, review, sum, amountTips, photoLink }) => (
                <Col xs={24} sm={12} xl={8} key={address}>
                  <div className="widget__item">
                    <Row style={{ width: "100%" }} justify="space-between">
                      <Col span={8}>
                        <Avatar size={80} src={photoLink} />
                      </Col>
                      <Col span={16} style={{ height: 80 }}>
                        <Row justify="space-between" style={{ height: "100%" }}>
                          <Col>
                            <div className="widget__item_row">
                              <div className="name">{name}</div>
                              <div className="review">
                                {review.toFixed(1)} <StarOutlined />
                              </div>
                            </div>
                          </Col>
                          <Col>
                            <div className="widget__item_row">
                              <div className="sum">
                                {(sum * usdtKoef).toFixed(1)} USD
                              </div>
                              <div className="tips">{amountTips} tips</div>
                            </div>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </div>
                </Col>
              )
            )}
          </Row>
        </div>
      ) : (
        <Empty className="empty-el" image={Empty.PRESENTED_IMAGE_SIMPLE} />
      )}
    </div>
  );
};

export default RatingTips;
